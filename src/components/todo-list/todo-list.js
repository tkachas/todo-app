import React, { useState, useEffect } from "react";
import styles from "./todo-list.module.css";

function TodoList({ todoList, setTodoList }) {
  const [expandedTask, setExpandedTask] = useState(null);

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

  useEffect(() => {
    console.log("TodoList rendered");
  }, [todoList]);

  return (
    <>
      {todoList.length ? (todoList
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        .map((task, id) => (
          <div key={id} className={styles.taskDiv}>
            <div className={styles.taskHeader}>
              <p
                className={`${styles.taskPriority} ${
                  styles[task.priority.toLowerCase()]
                }`}
              >
                {task.priority}
              </p>
              <p className={styles.taskTitle}>{task.title}</p>
              <p className={styles.taskDate}>{task.dueDate}</p>
              <button 
              className={styles.expandButton}
              onClick={() => toggleExpandTask(id)}
              >
                {expandedTask === id ? "▲" : "▼"}
              </button>
              <button className={styles.deleteButton} onClick={() => handleDeleteTask(id)}>Delete</button>
            </div>
            {expandedTask === id && (
              <div className={styles.taskDescription}>{task.description}</div>
            )}
          </div>
        ))) : (
            <p className={styles.noTasksMessage}>{'No current tasks, but you can always add more...'}</p>
        )}
    </>
  );
}

export default React.memo(TodoList);
