import React from "react";
import tabStyle from "./tab-element.module.css";

export default function TabElement(props) {
  const tabClass = props.active ? tabStyle.active : tabStyle.nonActive;
  const isDark = props.darkTheme ? tabStyle.darkActve : tabStyle.active;

  const handleClick = () => {
    props.switch(props.value);
  };

  return (
    <div className={`${tabClass} ${props.active && props.darkTheme ? tabStyle.darkActive : ""} ${tabStyle.tabElem} ${props.darkTheme ? tabStyle.darkTabElem : ""}`} onClick={handleClick}>
      {props.value}
    </div>
  );
}
