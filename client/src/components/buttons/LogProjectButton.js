import React from "react";
import { ProjectButton } from "../styles/ActionButton";
import getTodaysDate from "../../utils/getTodaysDate";

const LogProjectButton = ({ log, startTime, id, hoursToday, logDisabled }) => {
  const handleLogClick = () => {
    let addedHours = 0;
    let dateToday = getTodaysDate();
    if (startTime > 0) {
      addedHours = new Date().getTime() - startTime;
    }
    localStorage.setItem("projectHoursToday", 0);
    localStorage.setItem("projectStartTime", 0);
    localStorage.setItem("projectId", null);

    log(id, hoursToday + addedHours, dateToday);
  };
  return (
    <ProjectButton onClick={handleLogClick} disabled={logDisabled}>
      Log Project
    </ProjectButton>
  );
};

export default LogProjectButton;
