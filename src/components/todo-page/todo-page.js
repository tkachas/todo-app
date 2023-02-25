import React from "react";
import TodoList from "../todo-list/todo-list";
import TodoForm from "../todo-selected/todo-form";
import styles from "./todo-page.module.css";

export default function TodoPage({ todoList, setTodoList, addTask }) {
  return (
    <>
      <main className={styles.todoPageDiv}>
        <section className={styles.todoPageTaskList}>
          <TodoList todoList={todoList} setTodoList={setTodoList}/>
        </section>
        <section className={styles.addTaskDiv}>
          <TodoForm addTask={addTask} />
        </section>
      </main>
    </>
  );
}
