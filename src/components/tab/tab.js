import React, { useState } from "react";
import TabElement from "./tab-element/tab-element";
import style from "./tab.module.css";

export default function Tab(props) {
  const darkTheme = JSON.parse(localStorage.getItem("dark-theme") || "true");

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
      <div className={style.tab + " " + (darkTheme ? style.darkTab : "")} style={grid}>
        {/* <TabElement active={props.currentTab === "To do"} value={"To do"} switch={props.setCurrentTab}/>
        <TabElement active={props.currentTab === "Second"} value={"Second"} switch={props.setCurrentTab}/> */}
        {props.titles.map((el, key) => {
          return (
            <TabElement
              active={props.currentTab === el}
              value={el}
              switch={props.setCurrentTab}
              key={key}
              darkTheme={darkTheme}
            />
          );
        })}
      </div>
    </>
  );
}
