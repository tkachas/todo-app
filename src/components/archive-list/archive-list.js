import React from "react";
import todoListStyles from "../todo-list/todo-list.module.css";
import styles from "./archive-list.module.css";
import todoPageStyles from "../todo-page/todo-page.module.css";

export default function ArchiveList({
  completedTasks,
  setCompletedTasks,
  todoList,
  setTodoList,
}) {
  const darkTheme = JSON.parse(localStorage.getItem("dark-theme") || "true");
  const handleDeleteTask = (taskId) => {
    const updatedArchive = completedTasks.map((task, index) => {
      if (task.id === taskId) {
        const update = completedTasks.filter((elem) => elem !== task);
        setCompletedTasks(update);
        localStorage.setItem("archive", JSON.stringify(update));
      }
      if (task.id === taskId) {
        setTodoList([...todoList, task]);
        localStorage.setItem("tasks", JSON.stringify([...todoList, task]));
      }
      return task;
    });
  };

  return (
    <main
      className={
        styles.archiveList + " " + (darkTheme ? styles.darkArchiveList : "")
      }
    >
      {completedTasks.length ? (
        completedTasks
          .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
          .map(
            (task, id) =>
              !task.done && (
                <div
                  key={task.id}
                  className={
                    todoListStyles.taskDiv +
                    (task.done ? " " + todoListStyles.taskDone : "") +
                    (" " + styles.taskDiv) +
                    " " +
                    (darkTheme ? todoListStyles.darkTaskDiv : "")
                  }
                >
                  <div
                    className={
                      todoListStyles.taskHeader +
                      " " +
                      (darkTheme ? todoListStyles.darkTaskHeader : "")
                    }
                  >
                    <div className={todoListStyles.newTaskPriority}>
                      <div
                        className={
                          darkTheme
                            ? todoListStyles.darkNewLow
                            : todoListStyles.newLow
                        }
                      />
                      <div
                        className={`${
                          darkTheme
                            ? todoListStyles.darkNewMedium
                            : todoListStyles.newMedium
                        } ${
                          task.priority === "Medium" || task.priority === "High"
                            ? todoListStyles.check
                            : ""
                        }`}
                      />
                      <div
                        className={`${
                          darkTheme
                            ? todoListStyles.darkNewHigh
                            : todoListStyles.newHigh
                        } ${
                          task.priority === "High" ? todoListStyles.check : ""
                        }`}
                      />
                    </div>
                    <p className={todoListStyles.taskTitle}>{task.title}</p>
                    <p
                      className={
                        todoListStyles.taskDate +
                        " " +
                        (darkTheme ? todoListStyles.darkTaskDate : "")
                      }
                    >
                      {task.dueDate}
                    </p>
                    <button
                      className={
                        styles.deleteButton +
                        " " +
                        (darkTheme ? todoListStyles.darkDeleteButton : "")
                      }
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
          )
      ) : (
        <p className={todoListStyles.noTasksMessage + " " + (darkTheme ? todoListStyles.darkNoTasksMessage : "")}>
          No completed tasks..
        </p>
      )}
    </main>
  );
}
