# PR Policy Reviewer: behaviour spec

A chat agent on Cloudflare that checks GitHub pull requests against a team's own engineering rules.

- The **chat** (Agents SDK on a Durable Object) holds the conversation.
- **Memory** (the agent's SQLite) holds the rules and every past review.
- A **Workflow** runs each review as durable, retried steps.
- **Llama 3.3 on Workers AI** judges the diff against each rule that has no approved check.

Assignment parts: LLM = Llama 3.3 on Workers AI. Workflow and coordination = Cloudflare Workflows started by the agent. User input = chat. Memory = agent SQLite.

## Rules (memory)

### R1. Add a rule

- **Given** the agent has no rule "No console.log in src/"
- **When** the user says "add a rule: No console.log in src/"
- **Then** the agent stores the rule with an id
- **And** the agent confirms it and lists the current rules

### R2. Rules persist

- **Given** the user added rules in an earlier session
- **When** the user reloads the page and asks "what rules do we have?"
- **Then** the agent lists the same rules with their ids

### R3. Reject an empty or duplicate rule

- **Given** the rule "No console.log in src/" exists
- **When** the user adds "no console.log in src/ " (same text, other case or spaces), or an empty rule
- **Then** the agent stores nothing and says why

### R3a. Limit the number of rules

- **Given** 25 rules exist
- **When** the user adds another rule
- **Then** the agent stores nothing and says to remove a rule first

### R4. Remove a rule

- **Given** rule 2 exists
- **When** the user says "remove rule 2"
- **Then** rule 2 is deleted and the agent lists the rules left

### R5. Propose a static check

- **Given** the user adds the rule "No console.log in src/"
- **When** the rule can be checked with a pattern on the lines a pull request adds
- **Then** the agent proposes a check: a path glob such as `src/**` and a pattern such as `console\.log\(`
- **And** the check is stored as proposed, not used, until the user approves it
- **And** for a rule that needs judgement, such as "error messages are clear to users", the model is told to propose no check

### R6. Approve or drop a check

- **Given** rule 1 has a proposed check
- **When** the user says "approve the check for rule 1"
- **Then** future reviews run that check instead of asking the model about rule 1
- **When** the user says "drop the check for rule 1" instead
- **Then** the check is removed and the model judges rule 1

## Reviews (workflow)

### V1. Review a pull request

- **Given** at least one rule exists
- **When** the user pastes a public PR URL such as `https://github.com/owner/repo/pull/123` and asks for a review
- **Then** the agent starts a review workflow and says the review has started
- **And** the workflow fetches the PR title and diff from the GitHub API
- **And** the workflow asks Llama 3.3 to judge the diff against every rule with no approved check
- **And** when it finishes, the chat shows one line per rule: pass, fail or unclear, with a short reason and, where there is one, the file
- **And** the review is saved to memory

### V2. Invalid URL

- **Given** any state
- **When** the user asks to review something that is not a GitHub PR URL
- **Then** no workflow starts and the agent explains the expected URL shape
- **And** a link on `www.github.com` is accepted

### V3. No rules yet

- **Given** no rules exist
- **When** the user asks for a review
- **Then** no workflow starts and the agent asks the user to add rules first

### V4. Large diff

- **Given** a PR whose diff is larger than the model budget
- **When** the workflow prepares the diff
- **Then** lockfiles and generated files are dropped first, and a line over 1,000 characters is shortened
- **And** if the rest is still too large, it is cut to the budget and the report says the diff was truncated

### V5. GitHub fails

- **Given** GitHub returns a permanent error (404, or a used-up rate limit)
- **When** the fetch step runs
- **Then** the step fails at once with no retry, the chat shows a clear error, and no review is saved
- **Given** GitHub times out or returns a 5xx error
- **When** the fetch step runs
- **Then** the step retries with backoff, and if it still fails, the chat shows the error and no review is saved

### V6. Model returns bad output

- **Given** the model reply is not valid findings JSON, or answers none of the rules
- **When** the workflow parses it
- **Then** the workflow makes one repair call that may only reshape the reply
- **And** every rule with no valid answer gets "unclear", so every rule still gets a line
- **And** when the reply gives one rule both pass and fail, the rule fails

### V7. Recall past reviews

- **Given** earlier reviews are saved
- **When** the user asks "what did you find on owner/repo#123?", pastes the pull request link, or asks "show recent reviews"
- **Then** the agent answers from saved reviews without calling GitHub again

### V8. Static checks give exact results

- **Given** rule 1 has an approved check (`src/**`, `console\.log\(`)
- **When** a pull request adds `console.log(x)` at line 12 of `src/a.ts`
- **Then** rule 1 fails with `src/a.ts:12`, tagged "checked", with no model call for rule 1
- **And** the check runs on every added line in matching files before the diff is cut for the model, outside generated files and lockfiles
- **And** text in the diff cannot change a checked result

### V9. No model call when every rule is checked

- **Given** every rule has an approved check
- **When** the user asks for a review
- **Then** the workflow makes no Llama call, and the report shows only "checked" results

## Out of scope

- Private repos and GitHub auth tokens.
- Posting comments back to GitHub.
- Voice input.
