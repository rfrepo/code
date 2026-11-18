import { Button, Empty } from "@cloudflare/kumo";
import { ChatCircleDotsIcon } from "@phosphor-icons/react";

type Props = { disabled: boolean; onPick: (prompt: string) => void };

const ICON_SIZE = 32;
const EXAMPLE_PROMPTS = [
  "Add a rule: no console.log in src/",
  "Add a rule: every API route has a test",
  "List my rules",
  "Review https://github.com/cloudflare/agents/pull/100",
  "Show my recent reviews"
];

const renderPrompt =
  ({ disabled, onPick }: Props) =>
  (prompt: string) => {
    const pick = () => onPick(prompt);
    return (
      <Button
        key={prompt}
        variant="outline"
        size="sm"
        disabled={disabled}
        onClick={pick}
      >
        {prompt}
      </Button>
    );
  };

export function EmptyChat(props: Props) {
  return (
    <Empty
      icon={<ChatCircleDotsIcon size={ICON_SIZE} />}
      title="Add your team's rules, then paste a pull request link"
      contents={
        <div className="flex flex-wrap justify-center gap-2">
          {EXAMPLE_PROMPTS.map(renderPrompt(props))}
        </div>
      }
    />
  );
}
