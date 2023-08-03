import React, { useState } from "react";
import TabElement from "./tab-element/tab-element";
import style from "./tab.module.css";
import { useSelector } from "react-redux";

export default function Tab(props) {
  const darkTheme = JSON.parse(localStorage.getItem("dark-theme") || "true");

  const currentTab = useSelector((state) => state.todoStore.currentTab);

  let count = "";
  for (let i = 0; i < props.titles.length; i++) {
    count += "1fr";
    if (i !== props.titles.length - 1) {
      count += " ";
    }
  }

  let grid = {
    gridTemplateColumns: count,
  };

  return (
    <>
      <div
        className={style.tab + " " + (darkTheme ? style.darkTab : "")}
        style={grid}
      >
        {props.titles.map((el, key) => {
          return (
            <TabElement
              active={currentTab === el}
              value={el}
              key={key}
              darkTheme={darkTheme}
            />
          );
        })}
      </div>
    </>
  );
}
