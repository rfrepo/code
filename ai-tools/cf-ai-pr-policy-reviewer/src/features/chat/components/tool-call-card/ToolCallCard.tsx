import {
  Badge,
  Button,
  Surface,
  Text,
  type BadgeVariant
} from "@cloudflare/kumo";
import {
  CheckCircleIcon,
  GearIcon,
  HandIcon,
  ProhibitIcon,
  XCircleIcon
} from "@phosphor-icons/react";
import type {
  ToolCall,
  ToolStatus
} from "features/chat/services/chat-parts/chatParts";

type AnswerApproval = (approvalId: string, approved: boolean) => void;
type Props = { tool: ToolCall; onAnswer: AnswerApproval };
type ApprovalProps = { approvalId?: string; onAnswer: AnswerApproval };
type ValueProps = { label: string; value?: string };

const ICON_SIZE = 14;
const STATUS_VIEW: Record<
  ToolStatus,
  {
    badge: string;
    variant: BadgeVariant;
    ring: string;
    icon: React.ReactNode;
  }
> = {
  waiting: {
    badge: "Needs your OK",
    variant: "warning",
    ring: "ring-2 ring-kumo-warning",
    icon: (
      <HandIcon size={ICON_SIZE} weight="fill" className="text-kumo-warning" />
    )
  },
  running: {
    badge: "Running",
    variant: "secondary",
    ring: "ring ring-kumo-line",
    icon: (
      <GearIcon size={ICON_SIZE} className="text-kumo-inactive animate-spin" />
    )
  },
  done: {
    badge: "Done",
    variant: "success",
    ring: "ring ring-kumo-line",
    icon: (
      <CheckCircleIcon
        size={ICON_SIZE}
        weight="fill"
        className="text-kumo-success"
      />
    )
  },
  failed: {
    badge: "Error",
    variant: "destructive",
    ring: "ring-2 ring-kumo-danger",
    icon: (
      <XCircleIcon
        size={ICON_SIZE}
        weight="fill"
        className="text-kumo-danger"
      />
    )
  },
  denied: {
    badge: "Denied",
    variant: "secondary",
    ring: "ring ring-kumo-line",
    icon: <ProhibitIcon size={ICON_SIZE} className="text-kumo-inactive" />
  }
};

const answer =
  (onAnswer: AnswerApproval, approvalId: string, approved: boolean) => () =>
    onAnswer(approvalId, approved);

function ApprovalButtons({ approvalId, onAnswer }: ApprovalProps) {
  if (!approvalId) return null;
  return (
    <div className="mt-2 flex gap-2">
      <Button
        variant="primary"
        size="sm"
        onClick={answer(onAnswer, approvalId, true)}
      >
        Approve
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={answer(onAnswer, approvalId, false)}
      >
        Deny
      </Button>
    </div>
  );
}

function ToolValue({ label, value }: ValueProps) {
  if (!value) return null;
  return (
    <div className="mt-1">
      <Text size="xs" variant="secondary" bold>
        {label}
      </Text>
      <pre className="mt-0.5 font-mono text-xs text-kumo-subtle whitespace-pre-wrap overflow-auto max-h-64">
        {value}
      </pre>
    </div>
  );
}

/** One tool call the agent made: its name, status, input and result, and Approve and Deny while it waits. */
export function ToolCallCard({ tool, onAnswer }: Props) {
  const view = STATUS_VIEW[tool.status];
  return (
    <div className="flex justify-start">
      <Surface className={`max-w-[85%] px-4 py-2.5 rounded-xl ${view.ring}`}>
        <div className="flex items-center gap-2 mb-1">
          {view.icon}
          <Text size="xs" variant="secondary" bold>
            {tool.name}
          </Text>
          <Badge variant={view.variant}>{view.badge}</Badge>
        </div>
        <ToolValue label="Input" value={tool.input} />
        <ToolValue label="Output" value={tool.output} />
        <ToolValue label="Error" value={tool.error} />
        <ApprovalButtons approvalId={tool.approvalId} onAnswer={onAnswer} />
      </Surface>
    </div>
  );
}
