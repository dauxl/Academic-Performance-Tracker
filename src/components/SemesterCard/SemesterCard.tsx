"use client";

import styles from "./SemesterCard.module.css";
import { useRef } from "react";
import SubjectsTable from "../SubjectTable/SubjectTable";
import {
  calcSGPAFromSubjects,
  cgpaUpTo,
  getCredits,
  getSGPA,
  lastFilledIdx,
} from "@/lib/gpa";
import type { ExpandedMap, Mode, ModesMap, Semester } from "@/lib/types";

interface SemesterCardProps {
  sidx: number;
  sems: Semester[];
  expanded: ExpandedMap;
  modes: ModesMap;
  onToggle: (idx: number) => void;
  onSetMode: (idx: number, mode: Mode) => void;
  onSaveManual: (idx: number, sgpa: number, credits: number) => void;
  onClearManual: (idx: number) => void;
  onFieldChange: (
    semIdx: number,
    subIdx: number,
    field: "code" | "name" | "grade",
    value: string,
  ) => void;
  onCreditsChange: (semIdx: number, subIdx: number, value: number) => void;
  onDeleteSubject: (semIdx: number, subIdx: number) => void;
  onAddSubject: (semIdx: number) => void;
  onClearSemester: (idx: number) => void;
}

export default function SemesterCard({
  sidx,
  sems,
  expanded,
  modes,
  onToggle,
  onSetMode,
  onSaveManual,
  onClearManual,
  onFieldChange,
  onCreditsChange,
  onDeleteSubject,
  onAddSubject,
  onClearSemester,
}: SemesterCardProps) {
  const sem = sems[sidx];

  const isExp = !!expanded[sidx];

  const mode: Mode = modes[sidx] || "manual";

  const sgpa = getSGPA(sem);

  const creds = getCredits(sem);

  const lfIdx = lastFilledIdx(sems);

  const showCGPA = sidx === lfIdx;

  const cgpa = showCGPA ? cgpaUpTo(sems, sidx) : null;

  const locked = sidx > 0 && getSGPA(sems[sidx - 1]) === null;

  const sgpaInputRef = useRef<HTMLInputElement>(null);

  const creditsInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    const sv = parseFloat(sgpaInputRef.current?.value ?? "");
    const cv = parseFloat(creditsInputRef.current?.value ?? "");

    onSaveManual(sidx, sv, cv);
  };

  const detailSgpa = calcSGPAFromSubjects(sem.subjects || []);

  const detailCGPA = showCGPA ? cgpa : null;

  return (
    <div
      id={`sc_${sidx}`}
      className={`${styles.semCard} ${isExp ? styles.expanded : ""} ${
        locked ? styles.locked : ""
      }`}
    >
      <div className={styles.semHeader} onClick={() => onToggle(sidx)}>
        {!isExp ? (
          <div className={styles.compactCard}>
            <div className={styles.compactTitle}>{sem.name}</div>

            <div className={styles.compactSgpa}>
              {sgpa !== null ? sgpa.toFixed(2) : "—"}
            </div>

            <div className={styles.compactLabel}>SGPA</div>

            <div className={styles.compactFooter}>{creds} Credits</div>
          </div>
        ) : (
          <>
            <div className={styles.semNum}>S{sidx + 1}</div>

            <div className={styles.semInfo}>
              <div className={styles.semName}>{sem.name}</div>

              <div className={styles.semCredits}>
                {creds} Credits · {sem.subjects.length} Subjects
              </div>
            </div>

            <div className={styles.semRight}>
              <div
                className={`${styles.semSgpaBadge} ${
                  sgpa !== null ? styles.filled : ""
                }`}
              >
                {sgpa !== null ? sgpa.toFixed(2) : "—"}
              </div>

              {showCGPA && cgpa !== null && (
                <div className={styles.semCgpaPill}>CGPA {cgpa.toFixed(2)}</div>
              )}

              <span className={styles.chevron}>▼</span>
            </div>
          </>
        )}
      </div>

      <div className={styles.semBody}>
        <div className={styles.semBodyInner}>
          <div className={styles.modeTabs}>
            <button
              className={`${styles.modeTab} ${
                mode === "manual" ? styles.active : ""
              }`}
              onClick={e => {
                e.stopPropagation();
                onSetMode(sidx, "manual");
              }}
            >
              Manual
            </button>

            <button
              className={`${styles.modeTab} ${
                mode === "detailed" ? styles.active : ""
              }`}
              onClick={e => {
                e.stopPropagation();
                onSetMode(sidx, "detailed");
              }}
            >
              Subject-wise
            </button>

            <button
              className={styles.clearSemBtn}
              onClick={e => {
                e.stopPropagation();
                onClearSemester(sidx);
              }}
            >
              Clear Semester
            </button>
          </div>

          {mode === "manual" ? (
            <div className={styles.manualMode}>
              <div className={styles.inputGroup}>
                <label>SGPA</label>

                <input
                  ref={sgpaInputRef}
                  type="number"
                  step={0.01}
                  min={0}
                  max={10}
                  defaultValue={sem.manualSgpa ?? ""}
                  placeholder="0.00"
                  key={`sgpa_${sidx}_${sem.manualSgpa}`}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Total Credits</label>

                <input
                  ref={creditsInputRef}
                  type="number"
                  step={0.5}
                  min={0}
                  defaultValue={sem.manualCredits ?? ""}
                  placeholder="20"
                  key={`credits_${sidx}_${sem.manualCredits}`}
                />
              </div>

              <button
                className={styles.saveBtn}
                onClick={e => {
                  e.stopPropagation();
                  handleSave();
                }}
              >
                Save
              </button>

              <button
                className={styles.clearBtn}
                onClick={e => {
                  e.stopPropagation();
                  onClearManual(sidx);
                }}
              >
                Clear
              </button>
            </div>
          ) : (
            <>
              <SubjectsTable
                semIdx={sidx}
                subjects={sem.subjects || []}
                onFieldChange={onFieldChange}
                onCreditsChange={onCreditsChange}
                onDelete={onDeleteSubject}
                onAdd={onAddSubject}
              />

              <div className={styles.semResultStrip}>
                <div className={styles.resultItem}>
                  <div className={styles.resultVal}>
                    {detailSgpa !== null ? detailSgpa.toFixed(2) : "—"}
                  </div>

                  <div className={styles.resultLbl}>SGPA</div>
                </div>

                {detailCGPA !== null && (
                  <div className={styles.resultItem}>
                    <div className={`${styles.resultVal} ${styles.green}`}>
                      {detailCGPA.toFixed(2)}
                    </div>

                    <div className={styles.resultLbl}>CGPA</div>
                  </div>
                )}

                <div className={styles.resultItem}>
                  <div
                    className={styles.resultVal}
                    style={{
                      color: "var(--text-muted)",
                    }}
                  >
                    {creds}
                  </div>

                  <div className={styles.resultLbl}>Credits</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
