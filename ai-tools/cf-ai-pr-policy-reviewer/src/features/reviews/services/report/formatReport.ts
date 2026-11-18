import type {
  Finding,
  FindingSource
} from "features/reviews/services/findings/parseFindings";

export type ReportInput = {
  pr: string;
  title: string;
  findings: Finding[];
  truncated: boolean;
  dropped: string[];
};

const countOf = (findings: Finding[], verdict: Finding["verdict"]) =>
  findings.filter((f) => f.verdict === verdict).length;

export function summarise(findings: Finding[], truncated: boolean): string {
  const counts = `${countOf(findings, "fail")} fail, ${countOf(findings, "pass")} pass, ${countOf(findings, "unclear")} unclear`;
  return truncated ? `${counts} (diff truncated)` : counts;
}

const SOURCE_LABEL: Record<FindingSource, string> = {
  checked: "_checked_",
  judged: "_judged by the model_"
};

const findingLine = (f: Finding) =>
  [
    `- **${f.verdict.toUpperCase()}**`,
    `rule ${f.ruleId}: ${f.rule}`,
    f.file && `\`${f.file}\``,
    f.reason,
    f.source && SOURCE_LABEL[f.source]
  ]
    .filter(Boolean)
    .join(" · ");

/** What the reader must know about the diff the review saw: skipped files and truncation. */
export const reportNotes = ({
  dropped,
  truncated
}: Pick<ReportInput, "dropped" | "truncated">): string[] =>
  [
    dropped.length > 0 && `Skipped generated files: ${dropped.join(", ")}`,
    truncated &&
      "The diff was cut to fit the model, so the model did not see later files. Static checks ran on the whole diff."
  ].filter((note): note is string => Boolean(note));

/** The chat message for a finished review. */
export function formatReport(input: ReportInput): string {
  const notes = reportNotes(input);
  return [
    `**Review of ${input.pr}**: ${input.title}`,
    "",
    ...input.findings.map(findingLine),
    "",
    ...(notes.length > 0 ? [...notes, ""] : []),
    summarise(input.findings, input.truncated)
  ].join("\n");
}
