import React from 'react';
import styles from '../calendar-page.module.css';

function CalendarNav({ onPrevClick, onNextClick, dark }) {

    return (
      <div className={styles.btn + " " + (dark ? styles.darkBtn : "")}>
        {onPrevClick && <button onClick={onPrevClick}>Prev</button>}
        {onNextClick && <button onClick={onNextClick}>Next</button>}
      </div>
    );
}

export default CalendarNav;