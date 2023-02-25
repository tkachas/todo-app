import React from "react";
import tabStyle from "./tab-element.module.css";

export default function TabElement(props) {
  const tabClass = props.active ? tabStyle.active : tabStyle.nonActive;

  const handleClick = () => {
    props.switch(props.value);
  };

  return (
    <div className={`${tabClass} ${tabStyle.tabElem}`} onClick={handleClick}>
      {props.value}
    </div>
  );
}
