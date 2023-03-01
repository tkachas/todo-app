import React, { useState } from "react";
import styles from "./calendar-page.module.css";
import CalendarNav from "./calendar-nav/calendar-nav";
import CalendarBlock from "./calendar-block/calendar-block";
import TodoForm from "../todo-selected/todo-form";

function CalendarPage({ addTask }) {
  const darkTheme = JSON.parse(localStorage.getItem("dark-theme") || "true");
  const [date, setDate] = useState(new Date());
  const [currentDay, setCurrentDay] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const handlePrevClick = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const handleNextClick = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  return (
    <main className={styles.calendarPageContainer}>
      <CalendarBlock
        date={date}
        setDate={setDate}
        currentDay={currentDay}
        select={setSelectedDate}
      />
      <section className={styles.navButtons}>
        <CalendarNav onPrevClick={handlePrevClick} dark={darkTheme} />
        <CalendarNav onNextClick={handleNextClick} dark={darkTheme} />
      </section>
      <section className={(!selectedDate ? styles.notPickedDateSettings : styles.pickedDateSettings) + " " + (darkTheme ? styles.darkNotPickedDateSettings : "")}>
        {selectedDate ? (
          <TodoForm selectedDate={selectedDate} addTask={addTask}/>
        ) : (
          <h1 className={styles.notPickedDateText + " " + (darkTheme ? styles.darkNotPickedDateText : "")}>
            PICK A DATE TO ADD A TASK
          </h1>
        )}
      </section>
    </main>
  );
}

export default CalendarPage;
