import type { ReactNode } from "react";
import styles from "./SectionTitle.module.css";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type SectionTitleLine =
  | ReactNode
  | {
      content: ReactNode;
      accent?: boolean;
      className?: string;
      nowrap?: boolean;
    };

export type SectionTitleProps = {
  as?: HeadingTag;
  id?: string;
  className?: string;
  lineClassName?: string;
  accentClassName?: string;
  lines: readonly SectionTitleLine[];
  accentLine?: number | readonly number[];
  nowrap?: boolean;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function normalizeLine(line: SectionTitleLine) {
  if (
    line &&
    typeof line === "object" &&
    "content" in line
  ) {
    return line;
  }

  return { content: line };
}

function getAccentIndexes(accentLine: SectionTitleProps["accentLine"]) {
  if (typeof accentLine === "number") return [accentLine];
  return accentLine ? [...accentLine] : [];
}

export function SectionTitle({
  as: Tag = "h2",
  id,
  className,
  lineClassName,
  accentClassName,
  lines,
  accentLine,
  nowrap = true,
}: SectionTitleProps) {
  const accentIndexes = getAccentIndexes(accentLine);

  return (
    <Tag className={cx(styles.title, className)} id={id}>
      {lines.map((line, index) => {
        const titleLine = normalizeLine(line);
        const isAccent = titleLine.accent ?? accentIndexes.includes(index);
        const shouldNowrap = titleLine.nowrap ?? nowrap;

        return (
          <span
            className={cx(
              styles.line,
              shouldNowrap && styles.nowrap,
              isAccent && styles.accent,
              lineClassName,
              isAccent && accentClassName,
              titleLine.className,
            )}
            key={index}
          >
            {titleLine.content}
          </span>
        );
      })}
    </Tag>
  );
}

export default SectionTitle;
