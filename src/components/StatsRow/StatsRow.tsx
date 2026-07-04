import styles from "./StatsRow.module.css";
import { getSGPA, globalCGPA } from "@/lib/gpa";
import type { Semester } from "@/lib/types";

interface StatsRowProps {
  sems: Semester[];
}

const TOTAL_SEMESTERS = 8;
const AVG_CREDITS_PER_SEM = 20;
const TARGET_CGPA = 8.0;

export default function StatsRow({ sems }: StatsRowProps) {
  const { cgpa, totalCreds, totalPts } = globalCGPA(sems);

  const filled = sems.filter(s => getSGPA(s) !== null);
  const sgpas = filled.map(s => getSGPA(s) as number);

  const best = sgpas.length ? Math.max(...sgpas).toFixed(2) : "—";
  const worst = sgpas.length ? Math.min(...sgpas).toFixed(2) : "—";
  const percent = cgpa !== null ? `${(cgpa * 10).toFixed(1)}%` : "—";

  let needed = "—";

  if (cgpa !== null && filled.length < TOTAL_SEMESTERS) {
    const rem = TOTAL_SEMESTERS - filled.length;

    const requiredAvg =
      (TARGET_CGPA * (totalCreds + rem * AVG_CREDITS_PER_SEM) - totalPts) /
      (rem * AVG_CREDITS_PER_SEM);

    const n = Math.min(10, Math.max(0, requiredAvg));

    needed = n > 10 ? "Hard" : n.toFixed(2);
  } else if (cgpa !== null && cgpa >= TARGET_CGPA) {
    needed = "✓ Done";
  }

  return (
    <div className={styles.statsRow}>
      <div className={`${styles.statBox} ${styles.colPurple}`}>
        <div className={styles.val}>{best}</div>
        <div className={styles.lbl}>Best SGPA</div>
      </div>

      <div className={`${styles.statBox} ${styles.colYellow}`}>
        <div className={styles.val}>{worst}</div>
        <div className={styles.lbl}>Lowest SGPA</div>
      </div>

      <div className={`${styles.statBox} ${styles.colGreen}`}>
        <div className={styles.val}>{needed}</div>
        <div className={styles.lbl}>Needed for 8.0</div>
      </div>

      <div className={styles.statBox}>
        <div className={styles.val}>{percent}</div>
        <div className={styles.lbl}>Percentage</div>
      </div>
    </div>
  );
}
