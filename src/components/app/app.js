import styles from "./app.module.css";
import { useState, useEffect } from "react";
import Tab from "../tab/tab";
import TodoPage from "../todo-page/todo-page";
import CalendarPage from "../calendar/calendar-page";
import ProgressPage from "../progress-page/progress-page";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem("tasks") || "[]")
  );
  const [completedTasks, setCompletedTasks] = useState(
    JSON.parse(localStorage.getItem("archive") || "[]")
  );
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("dark-theme") || "true")
  );

  const addTask = (newTask) => {
    setTodoList((prevTodoList) => [...prevTodoList, newTask]);
  };

  const currentTab = useSelector((state) => state.todoStore.currentTab);

  return (
    <main className={`${styles.back} ${darkMode ? styles.darkBack : ""}`}>
      <Tab titles={["To do", "Calendar", "Progress"]} />
      {currentTab === "To do" && (
        <TodoPage
          todoList={todoList}
          setTodoList={setTodoList}
          addTask={addTask}
          completedTasks={completedTasks}
          setCompletedTasks={setCompletedTasks}
        />
      )}
      {currentTab === "Calendar" && <CalendarPage addTask={addTask} />}
      {currentTab === "Progress" && (
        <ProgressPage
          completedTasks={completedTasks}
          setCompletedTasks={setCompletedTasks}
          setTodoList={setTodoList}
          todoList={todoList}
          addTask={addTask}
          setDarkMode={setDarkMode}
        />
      )}
    </main>
  );
}

export default App;
