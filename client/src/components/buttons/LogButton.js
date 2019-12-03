import React from "react";
import ActionButton from "../styles/ActionButton";

const LogButton = ({ log, startTime, dateToday, hoursToday, logDisabled }) => {
  const handleLogClick = () => {
    let addedHours = 0;
    if (startTime > 0) {
      addedHours = new Date().getTime() - startTime;
    }
    localStorage.setItem("hoursToday", 0);
    localStorage.setItem("dateToday", "");
    localStorage.setItem("startTime", 0);

    log(hoursToday + addedHours, dateToday);
  };
  return (
    <ActionButton onClick={handleLogClick} disabled={logDisabled}>
      Log Hours
    </ActionButton>
  );
};

export default LogButton;
