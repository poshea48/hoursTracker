import React from "react";
import ActionButton from "../styles/ActionButton";
import { logProjectFunc } from "./LogProjectButton";

const LogButton = ({
  log,
  startTime,
  dateToday,
  hoursToday,
  logDisabled,
  logProject
}) => {
  const handleLogClick = () => {
    let addedHours = 0;
    if (startTime > 0) {
      addedHours = new Date().getTime() - startTime;
    }
    localStorage.setItem("hoursToday", 0);
    localStorage.setItem("dateToday", "");
    localStorage.setItem("startTime", 0);

    log(hoursToday + addedHours, dateToday);
    if (logProject.hours > 0) {
      const { hours, id, projectStartTime, logProjectHours } = logProject;
      logProjectFunc(id, hours, projectStartTime, logProjectHours, dateToday);
    }
  };
  return (
    <ActionButton onClick={handleLogClick} disabled={logDisabled}>
      Log Hours
    </ActionButton>
  );
};

export default LogButton;
