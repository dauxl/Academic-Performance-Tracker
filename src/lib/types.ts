export interface Subject {
  code: string;
  name: string;
  grade: string;
  credits: number;
}

export interface Semester {
  name: string;
  manualSgpa: number | null;
  manualCredits: number | null;
  subjects: Subject[];
}

export type Mode = "manual" | "detailed";

export type ModesMap = Record<number, Mode>;
export type ExpandedMap = Record<number, boolean>;
