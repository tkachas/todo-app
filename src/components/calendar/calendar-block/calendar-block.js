import React, { useState } from "react";
import styles from "../calendar-page.module.css";

export default function CalendarBlock({ date, setDate, currentDay, select }) {

  const darkTheme = JSON.parse(localStorage.getItem("dark-theme") || "true");
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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

  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const firstDayOfMonth = new Date(year, date.getMonth(), 1).getDay();
  const numDaysInMonth = new Date(year, date.getMonth() + 1, 0).getDate();

  const days = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push("");
  }

  for (let i = 1; i <= numDaysInMonth; i++) {
    days.push(i);
  }

  const numCols = daysOfWeek.length;
  const numRows = Math.ceil(days.length / numCols);

  const handleDateSelection = (e) => {
    select(new Date(date.getFullYear(), date.getMonth(), e.target.innerText));
  };

  return (
    <div
      className={
        styles.calendarDiv + " " + (darkTheme ? styles.darkCalendarDiv : "")
      }
    >
      <h2>
        {month} {year}
      </h2>
      <table>
        <thead>
          <tr>
            {daysOfWeek.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {chunkArray(days, numCols).map((week, i) => (
            <tr key={i}>
              {week.map((day, j) => {
                const isCurrentDay =
                  date.getMonth() === currentDay.getMonth() &&
                  date.getFullYear() === currentDay.getFullYear() &&
                  day === currentDay.getDate();
                return (
                  <td
                    key={j}
                    className={`${isCurrentDay ? styles.current : ""} ${
                      darkTheme && isCurrentDay ? styles.darkCurrent : ""
                    } ${darkTheme ? styles.darkTd : styles.lightTd}`}
                    onClick={handleDateSelection}
                  >
                    {day}
                  </td>
                );
              })}
            </tr>
          ))}
          {/* Add empty rows to fill out the table */}
          {Array.from({
            length: numRows - chunkArray(days, numCols).length,
          }).map((_, i) => (
            <tr key={chunkArray(days, numCols).length + i}>
              {Array.from({ length: numCols }).map((_, j) => (
                <td key={j} style={{ width: 50, height: 50 }}></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function chunkArray(arr, size) {
  const chunkedArr = [];

  for (let i = 0; i < arr.length; i += size) {
    chunkedArr.push(arr.slice(i, i + size));
  }

  return chunkedArr;
}
