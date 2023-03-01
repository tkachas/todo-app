import React, { useState } from "react";
import todoList from "../todo-list/todo-list";
import styles from "./todo-form.module.css";

function TodoForm({ selectedDate, addTask }) {
  const darkTheme = JSON.parse(localStorage.getItem("dark-theme") || "true");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: "",
  });

  const generateId = () => {
    console.log(JSON.parse(localStorage.getItem("tasks") || "[]"));
    const idArr = JSON.parse(localStorage.getItem("tasks") || "[]").map(
      (obj) => obj.id
    );
    const uniqueId = Math.floor(Math.random() * 100000);
    if (~idArr.indexOf(uniqueId)) {
      generateId();
    } else {
      return uniqueId;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newTask = Object.fromEntries(formData.entries());
    newTask["id"] = generateId();

    // check for duplicate task title
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const duplicateTitle = tasks.some((task) => task.title === newTask.title);
    if (duplicateTitle) {
      alert("A task with the same title already exists.");
      return;
    }

    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    addTask(newTask);
    setFormValues({
      title: "",
      description: "",
      priority: "Low",
      dueDate: "",
    });
    for (const [key, value] of Object.entries(e.target)) {
      if (value.name === "title" || value.name === "description") {
        value.value = "";
      }
    }
  };

  const handleChange = (e) => {
    const { name, defaultValue, value } = e.target;
    if (
      (e.target.name === "description" && e.target.value.length <= 1) ||
      (e.target.name === "title" && e.target.value.length <= 1)
    ) {
      e.target.value = value.charAt(0).toUpperCase() + value.slice(1);
    }
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: defaultValue,
    }));
  };

  return (
    <section
      className={
        styles.todoTaskContainer +
        " " +
        (darkTheme ? styles.darkTaskContainer : "")
      }
    >
      {selectedDate ? (
        <h1 className={styles.todoTaskTitle + " " + (darkTheme ? styles.darkTodoTaskTitle : "")}>
          New task for{" "}
          {`${selectedDate.getDate()} ${
            months[selectedDate.getMonth()]
          } ${selectedDate.getFullYear()}`}
        </h1>
      ) : (
        <h1 className={styles.todoTaskTitle + " " + (darkTheme ? styles.darkTodoTaskTitle : "")}>New task</h1>
      )}

      <form className={styles.todoTaskForm + " " + (darkTheme ? styles.darkTodoTaskForm : "")} onSubmit={handleSubmit}>
        <label
          className={
            styles.todoTaskLabel +
            " " +
            (darkTheme ? styles.darkTaskContainer : "")
          }
        >
          <input
            className={styles.todoTaskInput}
            type="text"
            maxLength="15"
            placeholder="Enter task title"
            name="title"
            defaultValue={formValues.title}
            onChange={handleChange}
            autoFocus
            required
          />
          <input
            className={styles.todoTaskInput}
            type="text"
            placeholder="Enter task description"
            name="description"
            defaultValue={formValues.description}
            onChange={handleChange}
          />
          <select
            name="priority"
            aria-label="Priority"
            defaultValue={formValues.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          {selectedDate ? (
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              lang="en"
              value={selectedDate
                .toLocaleDateString("en-GB")
                .split("/")
                .reverse()
                .join("-")}
            />
          ) : (
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              lang="en"
              defaultValue={new Date()
                .toLocaleDateString("en-GB")
                .split("/")
                .reverse()
                .join("-")}
              onChange={handleChange}
            />
          )}
        </label>
        <button className={styles.todoTaskButton} type="submit">
          Add Task
        </button>
      </form>
    </section>
  );
}

export default TodoForm;
