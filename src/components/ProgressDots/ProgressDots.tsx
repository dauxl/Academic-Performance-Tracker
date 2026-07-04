import styles from "./ProgressDots.module.css";
import { lastFilledIdx } from "@/lib/gpa";
import type { Semester } from "@/lib/types";

interface ProgressDotsProps {
  sems: Semester[];
}

export default function ProgressDots({ sems }: ProgressDotsProps) {
  const lfIdx = lastFilledIdx(sems);
  const next = lfIdx + 1;

  return (
    <div className={styles.progressRow}>
      {sems.map((_, i) => (
        <div
          key={i}
          className={`${styles.dot} ${
            i <= lfIdx
              ? styles.done
              : i === next
              ? styles.current
              : ""
          }`}
          title={`Sem ${i + 1}`}
        />
      ))}

      <span className={styles.dotLabel}>
        {lfIdx + 1} / 8 complete
      </span>
    </div>
  );
}