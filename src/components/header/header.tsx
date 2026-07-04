"use client";

import styles from "./header.module.css";

interface HeaderProps {
  dark: boolean;
  onToggleTheme: () => void;
}

export default function Header({ dark, onToggleTheme }: HeaderProps) {
  return (
    <header className={styles.header}>
      <button
        className={styles.themeToggle}
        onClick={onToggleTheme}
      >
        {dark ? "☀️" : "🌙"}
      </button>

      <div className={styles.headerInner}>
        <div className={styles.headerBadge}>
          Academic Performance Tracker
        </div>

        <h1>GPA Dashboard</h1>

        <p>
          Thapar Institute of Engineering &amp; Technology
          &nbsp;·&nbsp;
          B.E. Computer Engineering
        </p>
      </div>
    </header>
  );
}