import React from "react";
import styles from "./progress-bar.module.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function ProgressBar({ percentComplete }) {
  const darkTheme = JSON.parse(localStorage.getItem("dark-theme") || "true");
  return (
    <section className={styles.progressBar}>
      <CircularProgressbar
        value={percentComplete}
        text={percentComplete + "%"}
        styles={buildStyles({
          textColor: `${darkTheme ? 'rgb(202, 202, 202)' : 'rgb(0,0,0,0.5)'}`,
          pathColor: `${darkTheme ? '#6B728E' : 'rgb(157, 172, 157)'}`,
          trailColor: "rgb(0,0,0,0.2",
        })}
      />
    </section>
  );
}
