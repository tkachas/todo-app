import React, { useState } from "react";
import styles from "./toggle-theme.module.css";

export default function ToggleButton({ onChange }) {
  const [isChecked, setIsChecked] = useState(
    JSON.parse(localStorage.getItem("dark-theme") || "true")
  );

  const handleToggle = () => {
    setIsChecked(!isChecked);
    onChange(!isChecked);
  };

  return (
    <div
      className={`${styles.toggleButton} ${isChecked && styles.checked}`}
      onClick={handleToggle}
    >
      <div className={styles.toggleCircle}>
        <div className={styles.halfMoon}/>
      </div>
    </div>
  );
}
