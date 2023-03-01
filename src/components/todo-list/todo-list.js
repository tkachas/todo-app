import React, { useState, useEffect } from "react";
import styles from "./todo-list.module.css";

function TodoList({
  todoList,
  setTodoList,
  setCompletedTasks,
  completedTasks,
  addTask,
}) {
  const [expandedTask, setExpandedTask] = useState(null);

  const darkTheme = JSON.parse(localStorage.getItem("dark-theme") || "true");

  const toggleExpandTask = (taskId) => {
    setExpandedTask((prevState) => {
      if (prevState === taskId) {
        return null;
      } else {
        return taskId;
      }
    });
  };

  const handleDeleteTask = (taskId) => {
    const updatedTodoList = todoList.filter((task, index) => index !== taskId);
    localStorage.setItem("tasks", JSON.stringify(updatedTodoList));
    setTodoList(updatedTodoList);
  };

  const handlePriorityChange = (e, id) => {
    e.target.className = `${styles.taskPriority} ${
      styles[e.target.value.toLowerCase()]
    } ${darkTheme}`;

    todoList.map((task, index) => {
      if (task.id === id) {
        const updated = todoList.filter((task) => task.id !== id);
        const result = [{ ...task, priority: e.target.value }, ...updated].sort(
          (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
        );
        console.log(result);

        setTodoList(result);
        localStorage.setItem("tasks", JSON.stringify(result));
      }
    });
  };

  const handleTaskDone = (e, id) => {
    const updatedTodoList = todoList.map((task, index) => {
      if (task.id === id && e.target.checked) {
        e.target.parentNode.parentNode.className = `${e.target.parentNode.parentNode.className} ${styles.taskDone}`;
        setCompletedTasks([...completedTasks, task]);
        localStorage.setItem(
          "archive",
          JSON.stringify([...completedTasks, task])
        );
        setTimeout(() => {
          const updatedTodoList = todoList.filter((task) => task.id !== id);
          localStorage.setItem("tasks", JSON.stringify(updatedTodoList));
          setTodoList(updatedTodoList);
        }, 400);
      }
      return task;
    });
    localStorage.setItem("tasks", JSON.stringify(updatedTodoList));
    setTodoList(updatedTodoList);
  };

  return (
    <>
      {todoList.length ? (
        todoList
          .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
          .map((task, id) => (
            <div
              key={task.id}
              className={
                styles.taskDiv +
                (task.done
                  ? " " + styles.taskDone
                  : "" + " " + (darkTheme ? styles.darkTaskDiv : ""))
              }
            >
              <div
                className={
                  styles.taskHeader +
                  " " +
                  (darkTheme ? styles.darkTaskHeader : "")
                }
              >
                <input
                  type="checkbox"
                  name="taskDone"
                  id={`task-${id}`}
                  onClick={(e) => handleTaskDone(e, task.id)}
                ></input>
                <div className={styles.newTaskPriority}>
                  <div
                    className={darkTheme ? styles.darkNewLow : styles.newLow}
                  />
                  <div
                    className={`${
                      darkTheme ? styles.darkNewMedium : styles.newMedium
                    } ${
                      task.priority === "Medium" || task.priority === "High"
                        ? styles.check
                        : ""
                    }`}
                  />
                  <div
                    className={`${
                          darkTheme
                            ? styles.darkNewHigh
                            : styles.newHigh
                        } ${
                          task.priority === "High" ? styles.check : ""
                        }`}
                  />
                </div>

                <p
                  className={styles.taskTitle}
                  onClick={() => toggleExpandTask(id)}
                >
                  {task.title}
                </p>
                <p
                  className={`${styles.taskDate} ${
                    darkTheme ? styles.darkTaskDate : ""
                  }`}
                  onClick={() => toggleExpandTask(id)}
                >
                  {task.dueDate}
                </p>

                <button
                  className={
                    styles.expandButton +
                    " " +
                    (darkTheme ? styles.darkExpandButton : "")
                  }
                  onClick={() => toggleExpandTask(id)}
                >
                  {expandedTask === id ? "▲" : "▼"}
                </button>
                <button
                  className={
                    styles.deleteButton +
                    " " +
                    (darkTheme ? styles.darkDeleteButton : "")
                  }
                  onClick={() => handleDeleteTask(id)}
                >
                  Delete
                </button>
              </div>
              {expandedTask === id && (
                <div
                  className={
                    styles.taskDescription +
                    " " +
                    (darkTheme ? styles.darkTaskDescription : "")
                  }
                >
                  {task.description
                    ? task.description
                    : "No description added..."}
                </div>
              )}
            </div>
          ))
      ) : (
        <p
          className={
            styles.noTasksMessage +
            " " +
            (darkTheme && styles.darkNoTasksMessage)
          }
        >
          No current tasks, but you can always add more...
        </p>
      )}
    </>
  );
}

export default React.memo(TodoList);
