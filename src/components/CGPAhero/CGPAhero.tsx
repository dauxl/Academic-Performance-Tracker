import styles from "./CGPAhero.module.css";
import { getSGPA, globalCGPA } from "@/lib/gpa";
import type { Semester } from "@/lib/types";

interface CgpaHeroProps {
  sems: Semester[];
}

export default function CgpaHero({ sems }: CgpaHeroProps) {
  const { cgpa, totalCreds, totalPts } = globalCGPA(sems);

  const filledCount = sems.filter(s => getSGPA(s) !== null).length;

  return (
    <div className={styles.cgpaHero}>
      <div className={styles.cgpaCard}>
        <div className={styles.cgpaLeft}>
          <div className={styles.cgpaMain}>
            <div className={styles.cgpaValue}>
              {cgpa !== null ? cgpa.toFixed(2) : "—"}
            </div>

            <div className={styles.cgpaLabel}>
              CGPA
              <br />
              <span
                style={{
                  fontSize: 10,
                  color: "var(--text-dim)",
                }}
              >
                / 10.0
              </span>
            </div>
          </div>
        </div>

        <div className={styles.cgpaMeta}>
          <div className={styles.metaItem}>
            <div className={styles.metaVal}>{filledCount}</div>

            <div className={styles.metaLbl}>Semesters</div>
          </div>

          <div className={styles.metaItem}>
            <div className={styles.metaVal}>{totalCreds}</div>

            <div className={styles.metaLbl}>Credits</div>
          </div>

          <div className={styles.metaItem}>
            <div className={styles.metaVal}>{totalPts.toFixed(0)}</div>

            <div className={styles.metaLbl}>Grade Pts</div>
          </div>
        </div>

        <div className={styles.cgpaBarWrap}>
          <div className={styles.cgpaBarTrack}>
            <div
              className={styles.cgpaBarFill}
              style={{
                width: cgpa !== null ? `${(cgpa / 10) * 100}%` : "0%",
              }}
            />
          </div>

          <div className={styles.cgpaBarLabels}>
            <span>0</span>

            <span style={{ color: "#6c63ff" }}>▲ Min: 5.0</span>

            <span>10</span>
          </div>
        </div>
      </div>
    </div>
  );
}
