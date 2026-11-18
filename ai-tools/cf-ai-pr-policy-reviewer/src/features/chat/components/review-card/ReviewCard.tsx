import type { ReactNode } from "react";
import { Badge, Surface, Text, type BadgeVariant } from "@cloudflare/kumo";
import {
  CheckCircleIcon,
  WarningCircleIcon,
  XCircleIcon
} from "@phosphor-icons/react";
import {
  reviewView,
  type Verdict,
  type VerdictCount
} from "features/chat/services/review-view/reviewView";
import type { ReviewCard as Review } from "shared/types/reviewCard";

type Props = { review: Review };
type Finding = Review["findings"][number];
type Source = NonNullable<Finding["source"]>;

const ICON_SIZE = 18;
const VERDICT_VIEW: Record<
  Verdict,
  { label: string; variant: BadgeVariant; icon: ReactNode; row: string }
> = {
  fail: {
    label: "Fail",
    variant: "error",
    icon: (
      <XCircleIcon
        size={ICON_SIZE}
        weight="fill"
        className="text-kumo-danger"
      />
    ),
    row: "bg-kumo-danger-tint"
  },
  unclear: {
    label: "Unclear",
    variant: "warning",
    icon: (
      <WarningCircleIcon
        size={ICON_SIZE}
        weight="fill"
        className="text-kumo-warning"
      />
    ),
    row: "bg-kumo-warning-tint"
  },
  pass: {
    label: "Pass",
    variant: "success",
    icon: (
      <CheckCircleIcon
        size={ICON_SIZE}
        weight="fill"
        className="text-kumo-success"
      />
    ),
    row: "bg-kumo-success-tint"
  }
};

const SOURCE_LABEL: Record<Source, string> = {
  checked: "Static check",
  judged: "Model"
};

const renderCount = ({ verdict, count }: VerdictCount) => (
  <Badge key={verdict} variant={VERDICT_VIEW[verdict].variant}>
    {`${count} ${verdict}`}
  </Badge>
);

function FindingFile({ file }: { file?: string }) {
  if (!file) return null;
  return (
    <code className="block font-mono text-xs text-kumo-subtle">{file}</code>
  );
}

function FindingSource({ source }: { source?: Source }) {
  if (!source) return null;
  return <Badge variant="outline">{SOURCE_LABEL[source]}</Badge>;
}

function FindingRow({ finding }: { finding: Finding }) {
  const view = VERDICT_VIEW[finding.verdict];
  return (
    <li className={`flex gap-2.5 rounded-lg px-3 py-2 ${view.row}`}>
      <span className="mt-0.5 shrink-0">{view.icon}</span>
      <div className="min-w-0 space-y-0.5">
        <div className="flex flex-wrap items-center gap-2">
          <Text size="xs" bold>
            {view.label}
          </Text>
          <Text size="sm">{`${finding.ruleId}. ${finding.rule}`}</Text>
        </div>
        <FindingFile file={finding.file} />
        <Text size="xs" variant="secondary">
          {finding.reason}
        </Text>
        <FindingSource source={finding.source} />
      </div>
    </li>
  );
}

const renderFinding = (finding: Finding) => (
  <FindingRow key={finding.ruleId} finding={finding} />
);

const renderNote = (note: string) => (
  <Text key={note} size="xs" variant="secondary">
    {note}
  </Text>
);

function PullRequestRef({ pr, url }: { pr: string; url?: string }) {
  if (!url) return <Text bold>{pr}</Text>;
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="font-semibold text-kumo-link hover:underline"
    >
      {pr}
    </a>
  );
}

/** A finished review: the pull request, the verdict counts and one coloured row per rule. */
export function ReviewCard({ review }: Props) {
  const view = reviewView(review);
  return (
    <div className="flex justify-start">
      <Surface className="w-full max-w-[85%] space-y-3 rounded-xl px-4 py-3 ring ring-kumo-line">
        <div className="space-y-1">
          <PullRequestRef pr={view.pr} url={view.url} />
          <Text size="sm" variant="secondary">
            {view.title}
          </Text>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {view.counts.map(renderCount)}
        </div>
        <ul className="space-y-1.5">{view.findings.map(renderFinding)}</ul>
        <div className="space-y-1">{view.notes.map(renderNote)}</div>
        <Text size="xs" variant="secondary">
          {`Saved as review ${view.reviewId}`}
        </Text>
      </Surface>
    </div>
  );
}
