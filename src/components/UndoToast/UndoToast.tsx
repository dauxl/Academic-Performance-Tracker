"use client";

import styles from "./UndoToast.module.css";

interface UndoToastProps {
  visible: boolean;
  message: string;
  onUndo: () => void;
}

export default function UndoToast({
  visible,
  message,
  onUndo,
}: UndoToastProps) {
  return (
    <div className={`${styles.undoToast} ${visible ? styles.show : ""}`}>
      <span>{message}</span>

      <button className={styles.undoBtn} onClick={onUndo}>
        Undo
      </button>
    </div>
  );
}
