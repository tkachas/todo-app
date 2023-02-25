import styles from "./app.module.css";
import { useState, useEffect } from "react";
import Tab from "../tab/tab";
import TodoPage from "../todo-page/todo-page";
import CalendarPage from "../calendar/calendar-page";



function App() {
  const [currentTab, setCurrentTab] = useState("To do");
  const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem("tasks") || "[]"));
  
  const addTask = (newTask) => {
    setTodoList((prevTodoList) => [...prevTodoList, newTask]);
  };

  return (
    <main className={styles.back}>
      <Tab
        titles={["To do", "Calendar"]}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      {currentTab === "To do" && (
        <TodoPage todoList={todoList} setTodoList={setTodoList} addTask={addTask}/>
      )}
      {currentTab === "Calendar" && <CalendarPage addTask={addTask}/>}
    </main>
  );
}

export default App;
