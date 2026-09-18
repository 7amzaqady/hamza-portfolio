import type { ReactNode } from "react";
import RevealText from "./RevealText";

type Props = {
  eyebrow: string;
  title: string[];
  meta?: ReactNode;
  align?: "start" | "between";
};

export default function SectionHeading({ eyebrow, title, meta, align = "between" }: Props) {
  return (
    <div
      className={`flex flex-col gap-6 border-line border-t pt-6 ${
        align === "between" ? "md:flex-row md:items-end md:justify-between" : ""
      }`}
    >
      <div>
        <p className="eyebrow mb-6">{eyebrow}</p>
        <h2 className="display text-section max-w-[18ch]">
          <RevealText lines={title} />
        </h2>
      </div>
      {meta ? <div className="shrink-0 md:max-w-[34ch]">{meta}</div> : null}
    </div>
  );
}
