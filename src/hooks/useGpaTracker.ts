"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { DEFAULT_SEMS } from "@/lib/data";
import type { ExpandedMap, Mode, ModesMap, Semester } from "@/lib/types";

const SEMS_KEY = "tiet_sems";
const EXP_KEY = "tiet_exp";
const MODES_KEY = "tiet_modes";
const THEME_KEY = "tiet_theme";

const DEFAULT_MODES: ModesMap = { 0: "detailed", 1: "detailed", 2: "detailed" };

function cloneSems(sems: Semester[]): Semester[] {
  return JSON.parse(JSON.stringify(sems));
}

interface PersistedState {
  sems: Semester[];
  expanded: ExpandedMap;
  modes: ModesMap;
  dark: boolean;
  loaded: boolean;
}

/**
 * Default state used for the very first render, both on the server (static
 * generation) and on the client before hydration. It must NOT touch
 * localStorage, or the client's first render would mismatch the server's.
 */
function getDefaultState(): PersistedState {
  return {
    sems: cloneSems(DEFAULT_SEMS),
    expanded: {},
    modes: DEFAULT_MODES,
    dark: true,
    loaded: false,
  };
}

/**
 * Reads everything persisted in localStorage in one pass. Only safe to call
 * once mounted in the browser (e.g. from inside a useEffect).
 */
function readPersistedState(): PersistedState {
  try {
    const s = localStorage.getItem(SEMS_KEY);
    const e = localStorage.getItem(EXP_KEY);
    const m = localStorage.getItem(MODES_KEY);
    const savedTheme = localStorage.getItem(THEME_KEY);
    return {
      sems: s ? JSON.parse(s) : cloneSems(DEFAULT_SEMS),
      expanded: e ? JSON.parse(e) : {},
      modes: m ? JSON.parse(m) : DEFAULT_MODES,
      dark: savedTheme !== "light",
      loaded: true,
    };
  } catch {
    return {
      sems: cloneSems(DEFAULT_SEMS),
      expanded: {},
      modes: DEFAULT_MODES,
      dark: true,
      loaded: true,
    };
  }
}

export function useGpaTracker() {
  const [state, setState] = useState<PersistedState>(getDefaultState);
  const { sems, expanded, modes, dark, loaded } = state;

  const setSems = (updater: Semester[] | ((prev: Semester[]) => Semester[])) =>
    setState((prev) => ({
      ...prev,
      sems: typeof updater === "function" ? (updater as (p: Semester[]) => Semester[])(prev.sems) : updater,
    }));

  const setExpanded = (updater: ExpandedMap | ((prev: ExpandedMap) => ExpandedMap)) =>
    setState((prev) => ({
      ...prev,
      expanded: typeof updater === "function" ? (updater as (p: ExpandedMap) => ExpandedMap)(prev.expanded) : updater,
    }));

  const setModes = (updater: ModesMap | ((prev: ModesMap) => ModesMap)) =>
    setState((prev) => ({
      ...prev,
      modes: typeof updater === "function" ? (updater as (p: ModesMap) => ModesMap)(prev.modes) : updater,
    }));

  const setDark = (updater: boolean | ((prev: boolean) => boolean)) =>
    setState((prev) => ({
      ...prev,
      dark: typeof updater === "function" ? (updater as (p: boolean) => boolean)(prev.dark) : updater,
    }));

  const [undoVisible, setUndoVisible] = useState(false);
  const [undoMessage, setUndoMessage] = useState("");
  const undoStateRef = useRef<Semester[] | null>(null);
  const undoTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // First render (server + initial client paint) uses safe defaults so
  // hydration matches. Once mounted in the browser, load the real
  // localStorage values in a single setState call. This is the documented
  // "synchronize with an external system" use of an effect, so the
  // set-state-in-effect rule is intentionally silenced here.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(readPersistedState());
  }, []);

  // ---- Persist whenever data changes (skip the very first render) ----
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(SEMS_KEY, JSON.stringify(sems));
    localStorage.setItem(EXP_KEY, JSON.stringify(expanded));
    localStorage.setItem(MODES_KEY, JSON.stringify(modes));
  }, [sems, expanded, modes, loaded]);

  // ---- Theme ----
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
  }, [dark]);

  const toggleTheme = useCallback(() => setDark((d) => !d), []);

  // ---- Undo toast ----
  const showUndoToast = useCallback((message: string) => {
    setUndoMessage(message);
    setUndoVisible(true);
    if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current);
    undoTimeoutRef.current = setTimeout(() => setUndoVisible(false), 5000);
  }, []);

  const pushUndoState = useCallback(() => {
    undoStateRef.current = cloneSems(sems);
  }, [sems]);

  const undoLastAction = useCallback(() => {
    if (!undoStateRef.current) return;
    setSems(undoStateRef.current);
    undoStateRef.current = null;
    setUndoVisible(false);
  }, []);

  // Ctrl+Z / Cmd+Z global shortcut
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        const tag = (document.activeElement?.tagName || "").toUpperCase();
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
        e.preventDefault();
        undoLastAction();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [undoLastAction]);

  // ---- Mutations ----

  const toggleSemester = useCallback((idx: number) => {
    setExpanded((prev) => (prev[idx] ? {} : { [idx]: true }));
  }, []);

  const setSemesterMode = useCallback((idx: number, mode: Mode) => {
    setModes((prev) => ({ ...prev, [idx]: mode }));
  }, []);

  const saveManual = useCallback(
    (idx: number, sgpaValue: number, creditsValue: number) => {
      setSems((prev) => {
        const next = cloneSems(prev);
        if (!Number.isNaN(sgpaValue) && sgpaValue >= 0 && sgpaValue <= 10) {
          next[idx].manualSgpa = sgpaValue;
          next[idx].subjects = [];
        }
        if (!Number.isNaN(creditsValue)) next[idx].manualCredits = creditsValue;
        return next;
      });
    },
    [],
  );

  const clearManual = useCallback((idx: number) => {
    setSems((prev) => {
      const next = cloneSems(prev);
      next[idx].manualSgpa = null;
      next[idx].manualCredits = null;
      next[idx].subjects = [];
      return next;
    });
  }, []);

  const updateSubjectField = useCallback(
    (semIdx: number, subIdx: number, field: "code" | "name" | "grade", value: string) => {
      pushUndoState();
      setSems((prev) => {
        const next = cloneSems(prev);
        (next[semIdx].subjects[subIdx] as unknown as Record<string, string>)[field] = value;
        return next;
      });
    },
    [pushUndoState],
  );

  const updateSubjectCredits = useCallback(
    (semIdx: number, subIdx: number, value: number) => {
      pushUndoState();
      setSems((prev) => {
        const next = cloneSems(prev);
        next[semIdx].subjects[subIdx].credits = Number.isNaN(value) ? 0 : value;
        return next;
      });
    },
    [pushUndoState],
  );

  const addSubject = useCallback((idx: number) => {
    setSems((prev) => {
      const next = cloneSems(prev);
      next[idx].subjects.push({ code: "", name: "", grade: "", credits: 0 });
      return next;
    });
  }, []);

  const deleteSubject = useCallback(
    (semIdx: number, subIdx: number) => {
      pushUndoState();
      setSems((prev) => {
        const next = cloneSems(prev);
        next[semIdx].subjects.splice(subIdx, 1);
        return next;
      });
      showUndoToast("Subject deleted");
    },
    [pushUndoState, showUndoToast],
  );

  const clearSemester = useCallback(
    (idx: number) => {
      if (typeof window !== "undefined" && !window.confirm("Clear all grades for this semester?")) {
        return;
      }
      pushUndoState();
      setSems((prev) => {
        const next = cloneSems(prev);
        next[idx].manualSgpa = null;
        next[idx].manualCredits = null;
        next[idx].subjects.forEach((s) => (s.grade = ""));
        return next;
      });
      showUndoToast("Semester cleared");
    },
    [pushUndoState, showUndoToast],
  );

  const resetData = useCallback(() => {
    if (typeof window !== "undefined" && !window.confirm("Reset all GPA data? This cannot be undone.")) {
      return;
    }
    pushUndoState();
    localStorage.removeItem(SEMS_KEY);
    localStorage.removeItem(EXP_KEY);
    localStorage.removeItem(MODES_KEY);
    setSems(cloneSems(DEFAULT_SEMS));
    setExpanded({});
    setModes({});
    showUndoToast("Data reset");
  }, [pushUndoState, showUndoToast]);

  return {
    sems,
    expanded,
    modes,
    dark,
    toggleTheme,
    undoVisible,
    undoMessage,
    undoLastAction,
    toggleSemester,
    setSemesterMode,
    saveManual,
    clearManual,
    updateSubjectField,
    updateSubjectCredits,
    addSubject,
    deleteSubject,
    clearSemester,
    resetData,
  };
}
