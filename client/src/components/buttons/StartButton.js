import React from "react";
import ActionButton from "../styles/ActionButton";
import getTodaysDate from "../../utils/getTodaysDate";

const StartButton = ({ start, dateToday, startDisabled }) => {
  const handleStartClick = e => {
    e.preventDefault();
    let today =
      localStorage.getItem("dateToday") || dateToday || getTodaysDate();
    let startTime = new Date().getTime();
    localStorage.setItem("startTime", startTime);
    localStorage.setItem("dateToday", today);
    start(startTime, dateToday);
  };
  return (
    <ActionButton onClick={handleStartClick} disabled={startDisabled}>
      Start
    </ActionButton>
  );
};

export default StartButton;
