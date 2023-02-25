import React, { useState, useEffect } from "react";
import styles from "./current-time.module.css";

function CurrentTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeek = daysOfWeek[time.getDay()];

  return (
    <div>
      <p className={styles.dateTime}>
        {time.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: undefined,
        })}
        , {dayOfWeek}
      </p>
    </div>
  );
}

export default CurrentTime;
