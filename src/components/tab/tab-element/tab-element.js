import React from "react";
import tabStyle from "./tab-element.module.css";
import { useDispatch } from "react-redux";
import { setCurrentTab } from "../../../services/slices/todo-slice";

export default function TabElement(props) {
  const tabClass = props.active ? tabStyle.active : tabStyle.nonActive;

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setCurrentTab(props.value));
  };

  return (
    <div
      className={`${tabClass} ${
        props.active && props.darkTheme ? tabStyle.darkActive : ""
      } ${tabStyle.tabElem} ${props.darkTheme ? tabStyle.darkTabElem : ""}`}
      onClick={handleClick}
    >
      {props.value}
    </div>
  );
}
