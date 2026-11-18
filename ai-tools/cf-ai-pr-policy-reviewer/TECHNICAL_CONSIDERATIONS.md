# Technical considerations

This document records the design decisions for PR Policy Reviewer as short ADRs (architecture decision records). It also lists every check the system makes, and why. For what the app does and how to run it, see [README.md](README.md). For the behaviour as Given/When/Then scenarios, see [docs/spec.md](docs/spec.md).

## Contents

- [The problem](#the-problem)
- [Decisions](#decisions)
- [The checks we make](#the-checks-we-make)
- [Limits and numbers](#limits-and-numbers)
- [Known gaps](#known-gaps)

## The problem

Teams have rules that code review should enforce ("no console.log in src/", "every API route has a test"). People forget them, and generic linters do not know them. An LLM can read plain-language rules, but it is slow, it can guess wrong, and text in a pull request can try to trick it.

So I use **exact code where a rule allows it, and the model only where a rule needs judgement**. I also wanted every step to fail safely and survive a retry.

## Decisions

Each decision has the same parts: the context, the decision, and its consequences.

### ADR-001. A chat agent on a Durable Object holds the conversation and the memory

- **Context.** The assignment asks for chat input and memory. The rules and past reviews must survive a page reload.
- **Decision.** `ChatAgent` extends `AIChatAgent` from the Cloudflare Agents SDK. Each agent instance is a Durable Object with its own SQLite database. The rules and reviews tables live there, next to the chat history.
- **Consequences.** There is no separate database to run. State is strongly consistent inside one instance. Each instance has one writer, so the stores need no locks.

### ADR-002. A Workflow runs each review

- **Context.** A review calls GitHub and the model, and it can take a minute. Either call can fail.
- **Decision.** The agent starts a `ReviewWorkflow` and returns at once. The workflow has three durable steps: fetch and check, judge, and save. Each step retries on its own, and the Workflow engine stores its result.
- **Consequences.** The chat stays free while a review runs. A failure in the judge step retries the judge only, with no new GitHub fetch. The result is posted into the chat by `onWorkflowComplete` or `onWorkflowError`.

### ADR-003. Static checks first, the model only for judgement

- **Context.** Many rules are line patterns. A regular expression decides those exactly, the same way every time, and it gives a `file:line`. The model can be wrong, and text in a diff can steer it.
- **Decision.**
  - When a rule is added, the model proposes a check once: a path glob and a pattern.
  - The check is stored as "proposed" and isn't used until the user approves it. Approval is a chat instruction: the system prompt tells the model to call `approveCheck` only when the user asks.
  - In a review, approved checks run on every added line before the diff is cut for the model, with no model call. Files that match the generated-file patterns (lockfiles, minified bundles, source maps, and `dist/` or `build/` outside `src/`) are skipped. A renamed file counts by its new path, for the checks and the model alike.
  - The model judges only the rules that have no approved check. If every rule is checked, the review makes no model call.
- **Consequences.** A checked result is the same for the same diff, needs no model call, and text in the diff can't change it. The report tags each finding `checked` or `judged by the model`, so a reader knows how much to trust it. The static checks have no Cloudflare dependency, so the same code can run in CI later.

### ADR-004. Fail closed

- **Context.** I'd rather show an honest "unclear" than a wrong "pass".
- **Decision.**
  - A rule the model does not answer gets "unclear", never "pass".
  - A reply that is not valid JSON, or that answers none of the rules, gets one repair call. The repair prompt may only reshape the reply, not judge again.
  - A rule id written as `"1"` or a verdict written as `PASS` is read as meant, so a small format slip doesn't cost every rule.
  - If the model gives one rule two verdicts, the less trusting one wins: fail over unclear over pass.
  - A stored check that does not compile gives "unclear".
  - A failed proposal saves the rule with no check, so the model still judges it.
- **Consequences.** A review can show more "unclear" results, but a missing or broken answer never turns into a pass. The model can still give a wrong pass on a rule it judges, which is why the report tags each finding.

### ADR-005. Treat all user and author text as data

- **Context.** The pull request title and diff come from the PR author. The rule text comes from the chat. Both go into prompts.
- **Decision.**
  - The diff and title go inside `<pull_request>` tags. In the review and repair prompts, the rules go inside `<team_rules>` tags. The check proposal prompt sends the user's own rule text as it is, and `compileCheck` validates what comes back.
  - The system prompt says that text inside the tags is data, not instructions.
  - Our own tags are removed from the text first, so the text cannot close a block early.
  - A proposed check must pass `compileCheck` before it is stored.
- **Consequences.** These steps lower the risk of prompt injection, but they do not remove it. ADR-003 is the stronger defence: the review judge never sees a rule with an approved check.

### ADR-006. Fit the model's limits on purpose

- **Context.**
  - Llama 3.3 on Workers AI has a 24k-token context.
  - When `max_tokens` is not set, it stops at 256 output tokens.
  - A Workflow step result may not be larger than 1 MiB.
- **Decision.**
  - The model sees at most 24,000 characters of diff. Generated files are dropped first. A line over 1,000 characters, such as a minified bundle, is shortened, so one long line can't push its whole file out. The rest is cut at a line end.
  - The judge allows 2,048 output tokens, and a chat turn allows 1,024.
  - A chat turn sends only the 20 most recent messages.
  - The fetch step trims the diff before it returns.
- **Consequences.** A large pull request is judged only in part, and the report says so. Static checks still run on every added line before the cut.

### ADR-007. Retry what can succeed, stop what cannot

- **Context.** A GitHub 404 or 403 does not change on a retry. A timeout or a 502 can.
- **Decision.** The fetch step retries 3 times with exponential backoff. A 400, 401, 403, 404, 406, 409, 410, 422 or 429 from GitHub throws `NonRetryableError`, so the step fails at once. GitHub sends 406 when a diff is too large to return. The judge step retries twice.
- **Consequences.** A bad link fails in seconds, not minutes, and it does not use up the GitHub rate limit. A rate limit (403 or 429 with `x-ratelimit-remaining: 0` or `retry-after`) also stops at once, and the chat says when to try again, from `retry-after` or `x-ratelimit-reset`. Retrying sooner would only use up more of the limit.

### ADR-008. Make the save idempotent

- **Context.** A step can run again after its result was lost. A plain `INSERT` would then make two rows for one review.
- **Decision.** The reviews table has `workflow_id UNIQUE`, and the save uses `ON CONFLICT (workflow_id) DO UPDATE ... RETURNING id`.
- **Consequences.** One workflow gives one review row, and a repeated save returns the same id.

### ADR-009. One agent instance per browser, and no authentication in the demo

- **Context.** With no instance name, every visitor joins the same agent and sees everyone else's rules.
- **Decision.** Each browser makes a random session name, keeps it in `localStorage`, and connects to its own instance.
- **Consequences.** Visitors are kept apart, but a session name is not a login. In production, [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/policies/access/) would go in front, and the user id would be the instance name.

### ADR-010. Rules come from chat in the demo, and from a reviewed file in production

- **Context.** In a real team, a rule change is a policy change. It needs review and history.
- **Decision.** I take rules from chat in the demo, because it shows the agent, its tools and its memory together. Every rule is validated before it's stored (see [The checks we make](#the-checks-we-make)). In production, the rules would live in a file such as `.github/pr-policy.yml`, which is changed only by a pull request that CODEOWNERS approve. Danger.js and Semgrep work the same way.
- **Consequences.** The demo accepts rules that make no sense, such as "be nice". The model will usually mark them "unclear".

### ADR-011. Code is grouped by feature, and the agent joins them

- **Context.** The chat UI, the rules and the reviews change for different reasons.
- **Decision.**
  - Code is in three layers: `agent/` (`ChatAgent`), `features/` (rules, reviews, chat) and `shared/`.
  - The agent is our own Durable Object class, not an external service. It joins the rules and reviews tools, so it sits above the features and can't live in `shared/`.
  - `ChatScreen` uses only the chat feature, so it lives in `features/chat/`.
  - Features never import each other. Imports only go down: `app → agent → features → shared`, and a layer can skip the one below it.
  - Each SDK is wrapped once: Workers AI in `llama.ts`, GitHub in `githubClient.ts`, and the agent connection in `useChatSession.ts`.
  - The fallow boundaries in `.fallowrc.json` enforce the import direction.
- **Consequences.** Each feature can be tested alone with plain functions. For example, the rule actions take a fake proposer, and the stores use a real in-memory SQLite.

### ADR-012. Every failure is visible in the UI

- **Context.** A failure the user cannot see looks like a hang or a blank page.
- **Decision.**
  - A failed chat turn, for example when Workers AI is down, shows a banner with the error, Retry and Dismiss. `useChatSession` reads `error`, `regenerate` and `clearError` from `useAgentChat`.
  - An error boundary around the app shows "Something went wrong. Your rules and reviews are saved." and a Reload button instead of a blank page.
  - A failed review is posted into the chat by `onWorkflowError`. If the review was saved before the failure, the message says so. A failed tool call shows an "Error" card.
  - A workflow's chat message has an id made from the workflow id, so a callback that runs twice posts once. The SDK dedupes its own notifications the same way.
- **Consequences.** The user always has a next step. Rules, reviews and the last 100 messages are in the agent's SQLite, so a reload keeps them. Text that wasn't sent yet is lost.

## The checks we make

### At the chat input (rules)

| Check                                                                                   | Where                               | Why                                                                                                                     |
| --------------------------------------------------------------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| The rule is not empty and is at most 300 characters                                     | `ruleCheck.ts`                      | Keeps the rules readable and the prompt small                                                                           |
| The rule is not a duplicate (case and extra spaces ignored)                             | `ruleCheck.ts`                      | One rule, one verdict                                                                                                   |
| There are at most 25 rules                                                              | `ruleCheck.ts`                      | All judged rules go into one prompt with a 24k-token context                                                            |
| The path glob uses only letters, digits, `. / - _ @ * ?`, and is at most 100 characters | `compileCheck.ts`                   | A glob cannot inject regular expression syntax                                                                          |
| The pattern is 1 to 200 characters                                                      | `compileCheck.ts`                   | A short pattern is cheap to run                                                                                         |
| The pattern has no repeated group that holds a repeat, such as `(a+)+` or `((a)+)+`     | `compileCheck.ts`                   | Stops the common catastrophic backtracking (ReDoS), not every form                                                      |
| The pattern compiles and does not match an empty line                                   | `compileCheck.ts`                   | A pattern that matches nothing in particular would flag every line                                                      |
| The check is approved in the chat                                                       | `ruleActions.ts`, `systemPrompt.ts` | The system prompt lets the model call `approveCheck` only when the user asks. It's an instruction, not an enforced gate |

### At the chat input (reviews)

| Check                                                                                                                                                        | Where               | Why                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- | ----------------------------------------- |
| The link's host is `github.com` or `www.github.com`, its path is `/<owner>/<repo>/pull/<number>` with at most 9 digits, and owner and repo are not only dots | `pullRequestUrl.ts` | No path tricks in the GitHub API call     |
| At least one rule exists                                                                                                                                     | `reviewActions.ts`  | A review with no rules has nothing to say |

### During a review

| Check                                                                                                    | Where                                  | Why                                          |
| -------------------------------------------------------------------------------------------------------- | -------------------------------------- | -------------------------------------------- |
| Only added lines are checked, with their line numbers in the new file                                    | `addedLines.ts`                        | A rule is about the change, not the old code |
| Paths are read the way Git writes them: quoted, with CRLF line ends, and renamed files by their new path | `diffPath.ts`                          | A path with a space still matches its check  |
| Lockfiles, minified bundles, source maps, and `dist/` or `build/` outside `src/` are skipped             | `prepareDiff.ts`                       | They are noise for a rule check              |
| Each model finding is checked against a schema, and a bad item is skipped                                | `parseFindings.ts`                     | One bad item does not lose the others        |
| A missing answer gives "unclear"                                                                         | `parseFindings.ts`                     | Fail closed (ADR-004)                        |
| Two verdicts for one rule keep the less trusting one                                                     | `parseFindings.ts`                     | Fail closed (ADR-004)                        |
| A reason is one line of at most 300 characters                                                           | `parseFindings.ts`                     | One line per rule in the report              |
| A permanent GitHub error stops the retries                                                               | `githubClient.ts`, `ReviewWorkflow.ts` | ADR-007                                      |
| A used-up GitHub rate limit gives a message with the reset time                                          | `githubClient.ts`                      | The user knows when to try again             |

### In the UI

| Check                                                                      | Where                                | Why                                      |
| -------------------------------------------------------------------------- | ------------------------------------ | ---------------------------------------- |
| A failed chat turn shows a banner with Retry and Dismiss                   | `ChatError.tsx`, `useChatSession.ts` | ADR-012                                  |
| A render crash shows a message and Reload                                  | `ErrorBoundary.tsx`                  | No blank page                            |
| When disconnected, the header says so, and the input and Send are disabled | `ChatHeader.tsx`, `useComposer.ts`   | You can't send into a dropped connection |
| An empty chat shows example prompts                                        | `EmptyChat.tsx`                      | The first step is clear                  |

### Quality checks

CI (`.github/workflows/sanity-check.yml`) runs `npm run check`. I run fallow and the supply-chain checks by hand.

| Check                                        | Command                                                                    | Why                                                                                                        |
| -------------------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Format, lint, types and tests                | `npm run check` (oxfmt, oxlint, `tsc`, Vitest)                             | One command a reviewer can run                                                                             |
| Service tests with a real SQLite             | Vitest `node` project                                                      | The SQL runs for real, not as a mock                                                                       |
| Button tests in a DOM                        | Vitest `dom` project (Testing Library, happy-dom)                          | Send, Stop, Clear, the example prompts, the theme toggle, Retry, Dismiss and Reload work as a user expects |
| Layering, dead code, duplication, complexity | `fallow architecture`, `fallow dead-code`, `fallow dupes`, `fallow health` | Checks import boundaries, unused code, duplication and function complexity                                 |
| Supply chain                                 | `npm audit signatures`, `allowScripts` in `package.json`                   | Only listed packages may run install scripts                                                               |

## Limits and numbers

| Limit                       | Value                         | Source              |
| --------------------------- | ----------------------------- | ------------------- |
| Rules                       | 25                            | `ruleCheck.ts`      |
| Rule length                 | 300 characters                | `ruleCheck.ts`      |
| Pattern length              | 200 characters                | `compileCheck.ts`   |
| Line sent to the model      | 1,000 characters              | `prepareDiff.ts`    |
| Finding reason              | 300 characters                | `parseFindings.ts`  |
| Diff sent to the model      | 24,000 characters             | `ReviewWorkflow.ts` |
| Judge output                | 2,048 tokens                  | `llama.ts`          |
| Chat turn output            | 1,024 tokens                  | `ChatAgent.ts`      |
| Messages sent per chat turn | 20 most recent                | `ChatAgent.ts`      |
| Messages kept               | 100                           | `ChatAgent.ts`      |
| Tool steps per chat turn    | 10                            | `ChatAgent.ts`      |
| Fetch retries               | 3, exponential, 30 s timeout  | `ReviewWorkflow.ts` |
| Judge retries               | 2, exponential, 2 min timeout | `ReviewWorkflow.ts` |

## Known gaps

- `ReviewWorkflow` is tested as one pipeline in Node, with the Workers modules mocked. It has no test in the Workers runtime: `@cloudflare/vitest-pool-workers` 0.23 needs Vitest 4, and this repo uses Vitest 5. `ChatAgent` has no test of its own; its message helper does.
- The nested-repeat check catches the common slow patterns, not every one. The Workers CPU limit bounds the cost. RE2, which cannot backtrack, would remove the risk.
- GitHub allows 60 unauthenticated requests an hour per IP address. `githubClient.ts` doesn't send a token yet. A `GITHUB_TOKEN` secret, sent by the client, would raise this and allow private repositories.
- Each review makes two GitHub API calls: one for the title and one for the diff.
- Some choices are on purpose. Line patterns are case-sensitive, as code is. Rule ids are never reused, so a saved review always names the rule it judged. A link to `/pull/1/commits/<sha>` reviews the whole pull request, and the reply names the pull request it started.
- Chat replies arrive whole, not word by word. A Workers AI stream sends each tool call piece twice, in `choices[0].delta.tool_calls` and in a top-level `tool_calls`, and `workers-ai-provider` 4.0.1 reads both, so every tool call got doubled JSON. I found this in a live test. `llama.ts` wraps the model in the AI SDK's `simulateStreamingMiddleware`, so each step is one generate call. When the provider reads one field, the wrapper can go.
- The model sometimes calls tools nobody asked for. In one live test, after "add a rule", it approved the check, removed the rule, and started a review of a made-up link. So `approveCheck`, `dropCheck`, `removeRule` and `reviewPullRequest` use `needsApproval`: the chat shows Approve and Deny, and the tool runs only after Approve.
- The gate alone did not stop the calls. In a live test, after one Deny, the model made 13 more tool calls and wrote no reply, because each answer to an approval starts a new turn with a new step budget. So once a tool has answered, the next step offers no tools (`agent/replyAfterTool.ts`), and a turn has at most 2 steps. The cost: "add a rule and review X" takes two messages.
- The model's words can still be wrong. In a live test it offered a proposed check for a rule that had none. The tool output above the reply is correct.
- The model sometimes sends a rule number as `"1"`. The rule tools read a digit string as a number, as the findings parser does.
- The static checks run only inside the review. The next step is a GitHub Action that runs the same approved checks on each pull request.
