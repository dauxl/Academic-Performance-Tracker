import { GRADES } from "./data";
import type { Semester, Subject } from "./types";

/** A grade of E or F counts as a fail. */
export function isFail(grade: string): boolean {
  return grade === "E" || grade === "F";
}

/** SGPA computed strictly from a subject list (subject-wise / "detailed" mode). */
export function calcSGPAFromSubjects(subjects: Subject[]): number | null {
  let creds = 0;
  let pts = 0;
  for (const s of subjects) {
    const gp = GRADES[s.grade];
    if (gp === undefined) continue;
    const c = Number(s.credits) || 0;
    creds += c;
    pts += gp * c;
  }
  return creds === 0 ? null : Math.round((pts / creds) * 100) / 100;
}

/**
 * SGPA for a semester: prefers subject-wise calculation if subjects exist,
 * otherwise falls back to the manually entered SGPA.
 */
export function getSGPA(sem: Semester): number | null {
  if (sem.subjects && sem.subjects.length > 0) {
    const v = calcSGPAFromSubjects(sem.subjects);
    if (v !== null) return v;
  }
  if (
    sem.manualSgpa !== null &&
    sem.manualSgpa !== undefined &&
    (sem.manualSgpa as unknown as string) !== ""
  ) {
    return Number(sem.manualSgpa);
  }
  return null;
}

/** Total credits for a semester, from subjects if present, else the manual entry. */
export function getCredits(sem: Semester): number {
  if (sem.subjects && sem.subjects.length > 0) {
    return sem.subjects.reduce((a, s) => a + (Number(s.credits) || 0), 0);
  }
  return Number(sem.manualCredits) || 0;
}

/** Cumulative CGPA using every semester from 0 up to (and including) idx. */
export function cgpaUpTo(sems: Semester[], idx: number): number | null {
  let creds = 0;
  let pts = 0;
  for (let i = 0; i <= idx; i++) {
    const sem = sems[i];
    if (sem.subjects && sem.subjects.length > 0) {
      for (const s of sem.subjects) {
        const gp = GRADES[s.grade];
        if (gp === undefined) continue;
        const c = Number(s.credits) || 0;
        creds += c;
        pts += gp * c;
      }
    } else if (
      sem.manualSgpa !== null &&
      sem.manualSgpa !== undefined &&
      (sem.manualSgpa as unknown as string) !== ""
    ) {
      const c = Number(sem.manualCredits) || 0;
      if (c > 0) {
        creds += c;
        pts += Number(sem.manualSgpa) * c;
      }
    }
  }
  return creds === 0 ? null : Math.round((pts / creds) * 100) / 100;
}

/** Overall CGPA across every semester, plus running totals used elsewhere in the UI. */
export function globalCGPA(sems: Semester[]): {
  cgpa: number | null;
  totalCreds: number;
  totalPts: number;
} {
  let creds = 0;
  let pts = 0;
  for (const sem of sems) {
    if (sem.subjects && sem.subjects.length > 0) {
      for (const s of sem.subjects) {
        const gp = GRADES[s.grade];
        if (gp === undefined) continue;
        const c = Number(s.credits) || 0;
        creds += c;
        pts += gp * c;
      }
    } else if (
      sem.manualSgpa !== null &&
      sem.manualSgpa !== undefined &&
      (sem.manualSgpa as unknown as string) !== ""
    ) {
      const c = Number(sem.manualCredits) || 0;
      if (c > 0) {
        creds += c;
        pts += Number(sem.manualSgpa) * c;
      }
    }
  }
  return {
    cgpa: creds === 0 ? null : Math.round((pts / creds) * 100) / 100,
    totalCreds: creds,
    totalPts: pts,
  };
}

/** Index of the last semester that has a resolvable SGPA (-1 if none). */
export function lastFilledIdx(sems: Semester[]): number {
  let last = -1;
  for (let i = 0; i < sems.length; i++) {
    if (getSGPA(sems[i]) !== null) last = i;
  }
  return last;
}
