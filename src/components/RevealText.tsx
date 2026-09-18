import { motion } from "motion/react";

type Props = {
  lines: string[];
  className?: string;
  delay?: number;
  stagger?: number;
};

/** Mask-reveal for headings: each line slides up from behind a clipping edge. */
export default function RevealText({
  lines,
  className = "",
  delay = 0,
  stagger = 0.09,
}: Props) {
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={`${line}-${i}`} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="block"
            initial={{ y: "110%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, margin: "-12% 0px -8% 0px" }}
            transition={{
              duration: 0.95,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
