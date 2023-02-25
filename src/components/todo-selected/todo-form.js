import React, { useState } from "react";
import styles from "./todo-form.module.css";

function TodoForm({ selectedDate, addTask }) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newTask = Object.fromEntries(formData.entries());
  
    // check for duplicate task title
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
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
  };

  const handleChange = (e) => {
    const { name, defaultValue } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: defaultValue,
    }));
  };

  return (
    <section className={styles.todoTaskContainer}>
      {selectedDate ? (
        <h1 className={styles.todoTaskTitle}>
          New task for{" "}
          {`${selectedDate.getDate()} ${
            months[selectedDate.getMonth()]
          } ${selectedDate.getFullYear()}`}
        </h1>
      ) : (
        <h1 className={styles.todoTaskTitle}>New task</h1>
      )}

      <form className={styles.todoTaskForm} onSubmit={handleSubmit}>
        <label className={styles.todoTaskLabel}>
          <input
            className={styles.todoTaskInput}
            type="text"
            placeholder="Enter task title"
            name="title"
            defaultValue={formValues.title}
            onChange={handleChange}
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
              defaultValue={selectedDate
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
              defaultValue={formValues.dueDate}
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
