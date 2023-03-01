import React from "react";
import ArchiveList from "../archive-list/archive-list";
import ProgressBar from "../progress-bar/progress-bar";
import ToggleTheme from "../toggle-theme/toggle-theme";
import styles from "./progress-page.module.css";

export default function ProgressPage({
  completedTasks,
  setCompletedTasks,
  setTodoList,
  todoList,
  addTask,
  setDarkMode,
}) {
  const level = Math.floor(completedTasks.length / 10) + 1;
  const percent = (completedTasks.length * 10) % 100;

  const darkTheme = JSON.parse(localStorage.getItem("dark-theme") || "true");

  const handleThemeChange = (isChecked) => {
    setDarkMode(isChecked);
    localStorage.setItem("dark-theme", JSON.stringify(isChecked));
  };

  return (
    <main className={styles.progressPage}>
      <div className={styles.toggleButton}>
        <ToggleTheme onChange={handleThemeChange} />
      </div>
      <h1
        className={
          styles.archiveTitle + " " + (darkTheme ? styles.darkArchiveTitle : "")
        }
      >
        Level - {level - 1}
      </h1>
      <ProgressBar percentComplete={percent ? percent : 1} />
      <h1
        className={
          styles.archiveTitle + " " + (darkTheme ? styles.darkArchiveTitle : "")
        }
      >
        Completed tasks - {completedTasks.length} / {10 * level}
        <br />
        <span className={styles.tip}>
          Return the task to the To Do List by pressing "Delete"
        </span>
      </h1>
      <ArchiveList
        completedTasks={completedTasks}
        setCompletedTasks={setCompletedTasks}
        setTodoList={setTodoList}
        todoList={todoList}
        addTask={addTask}
      />
    </main>
  );
}
