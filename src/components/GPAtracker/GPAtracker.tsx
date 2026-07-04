"use client";

import styles from "./GPAtracker.module.css";

import Header from "../header/header";
import CgpaHero from "../CGPAhero/CGPAhero";
import StatsRow from "../StatsRow/StatsRow";
import ProgressDots from "../ProgressDots/ProgressDots";
import SemesterCard from "../SemesterCard/SemesterCard";
import UndoToast from "../UndoToast/UndoToast";

import { useGpaTracker } from "@/hooks/useGpaTracker";

export default function GpaTracker() {
  const {
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
  } = useGpaTracker();

  return (
    <>
      <Header dark={dark} onToggleTheme={toggleTheme} />

      <CgpaHero sems={sems} />

      <main className={styles.main}>
        <div className={styles.sectionTitle}>
          Overview
        </div>

        <StatsRow sems={sems} />

        <ProgressDots sems={sems} />

        <div className={styles.sectionTitle}>
          Semesters
        </div>

        <div className={styles.semList}>
          {sems.map((_, i) => (
            <SemesterCard
              key={i}
              sidx={i}
              sems={sems}
              expanded={expanded}
              modes={modes}
              onToggle={toggleSemester}
              onSetMode={setSemesterMode}
              onSaveManual={saveManual}
              onClearManual={clearManual}
              onFieldChange={updateSubjectField}
              onCreditsChange={updateSubjectCredits}
              onDeleteSubject={deleteSubject}
              onAddSubject={addSubject}
              onClearSemester={clearSemester}
            />
          ))}
        </div>
      </main>

      <button
        className={styles.resetBtn}
        onClick={resetData}
      >
        Reset Data
      </button>

      <UndoToast
        visible={undoVisible}
        message={undoMessage}
        onUndo={undoLastAction}
      />
    </>
  );
}