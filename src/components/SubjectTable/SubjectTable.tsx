"use client";

import styles from "./SubjectTable.module.css";
import { GRADES, GRADE_OPTS } from "@/lib/data";
import { isFail } from "@/lib/gpa";
import type { Subject } from "@/lib/types";

interface SubjectsTableProps {
  semIdx: number;
  subjects: Subject[];
  onFieldChange: (
    semIdx: number,
    subIdx: number,
    field: "code" | "name" | "grade",
    value: string,
  ) => void;
  onCreditsChange: (semIdx: number, subIdx: number, value: number) => void;
  onDelete: (semIdx: number, subIdx: number) => void;
  onAdd: (semIdx: number) => void;
}

export default function SubjectsTable({
  semIdx,
  subjects,
  onFieldChange,
  onCreditsChange,
  onDelete,
  onAdd,
}: SubjectsTableProps) {
  let totC = 0;
  let totE = 0;
  let totP = 0;

  subjects.forEach(s => {
    const gp = GRADES[s.grade];
    const c = Number(s.credits) || 0;

    totC += c;

    if (gp !== undefined) {
      totE += c;
      totP += gp * c;
    }
  });

  return (
    <>
      <div className={styles.subjectsTableWrap}>
        <table className={styles.subjectsTable}>
          <thead>
            <tr>
              <th className={styles.colCode}>Code</th>
              <th className={styles.colSubject}>Subject</th>
              <th className={styles.colGrade}>Grade</th>
              <th className={styles.colGp}>GP</th>
              <th className={styles.colCredits}>Credits</th>
              <th className={styles.colEarned}>Earned</th>
              <th className={styles.colPts}>Points</th>
              <th className={styles.colFail}>Fail?</th>
              <th className={styles.colDel}></th>
            </tr>
          </thead>

          <tbody>
            {subjects.map((s, i) => {
              const gp = GRADES[s.grade];
              const c = Number(s.credits) || 0;

              const gpVal = gp !== undefined ? gp : "";
              const earned = gp !== undefined ? c : "";
              const pts = gp !== undefined ? gp * c : "";

              const fail = s.grade ? isFail(s.grade) : null;

              const failClass =
                fail === null
                  ? styles.failNone
                  : fail
                    ? styles.failYes
                    : styles.failNo;

              const failText = fail === null ? "—" : fail ? "Yes" : "No";

              return (
                <tr key={i}>
                  <td className={styles.colCode}>
                    <input
                      type="text"
                      value={s.code || ""}
                      placeholder="UCS301"
                      onChange={e =>
                        onFieldChange(semIdx, i, "code", e.target.value)
                      }
                    />
                  </td>

                  <td className={styles.colSubject}>
                    <input
                      type="text"
                      value={s.name || ""}
                      placeholder="Subject name"
                      onChange={e =>
                        onFieldChange(semIdx, i, "name", e.target.value)
                      }
                    />
                  </td>

                  <td className={styles.colGrade}>
                    <select
                      className={styles.gradeSelect}
                      value={s.grade || ""}
                      onChange={e =>
                        onFieldChange(semIdx, i, "grade", e.target.value)
                      }
                    >
                      <option value="">—</option>

                      {GRADE_OPTS.map(g => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className={styles.colGp}>{gpVal}</td>

                  <td className={styles.colCredits}>
                    <input
                      type="number"
                      value={s.credits || ""}
                      min={0}
                      max={6}
                      step={0.5}
                      placeholder="4"
                      style={{ width: 52 }}
                      onChange={e =>
                        onCreditsChange(semIdx, i, parseFloat(e.target.value))
                      }
                    />
                  </td>

                  <td className={styles.colEarned}>{earned}</td>

                  <td className={styles.colPts}>
                    {pts !== "" ? Number(pts).toFixed(1) : ""}
                  </td>

                  <td className={styles.colFail}>
                    <span className={`${styles.failBadge} ${failClass}`}>
                      {failText}
                    </span>
                  </td>

                  <td className={styles.colDel}>
                    <button
                      className={styles.delBtn}
                      onClick={() => onDelete(semIdx, i)}
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>

          <tfoot className={styles.tableFooter}>
            <tr>
              <td
                colSpan={4}
                style={{
                  textAlign: "right",
                  fontSize: 11,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                }}
              >
                Total
              </td>

              <td
                className={styles.colCredits}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {totC}
              </td>

              <td
                className={styles.colEarned}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {totE}
              </td>

              <td
                className={styles.colPts}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {totP.toFixed(1)}
              </td>

              <td colSpan={2}></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <button className={styles.addSubjectBtn} onClick={() => onAdd(semIdx)}>
        ＋ Add Subject
      </button>
    </>
  );
}
