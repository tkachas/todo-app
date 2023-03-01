import React from "react";
import TodoList from "../todo-list/todo-list";
import TodoForm from "../todo-selected/todo-form";
import styles from "./todo-page.module.css";

export default function TodoPage({
  todoList,
  setTodoList,
  addTask,
  completedTasks,
  setCompletedTasks,
}) {
  return (
    <>
      <main className={styles.todoPageDiv}>
        <section
          className={`${styles.todoPageTaskList} ${
            JSON.parse(localStorage.getItem("dark-theme") || "true")
              ? styles.darkTodoPageTaskList
              : ""
          }`}
        >
          <TodoList
            todoList={todoList}
            setTodoList={setTodoList}
            setCompletedTasks={setCompletedTasks}
            completedTasks={completedTasks}
            addTask={addTask}
          />
        </section>
        <section className={styles.addTaskDiv}>
          <TodoForm addTask={addTask} />
        </section>
        
      </main>
    </>
  );
}
