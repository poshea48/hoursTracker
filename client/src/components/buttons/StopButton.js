import React from "react";
import ActionButton from "../styles/ActionButton";

const StopButton = ({ stop, startTime, hoursToday, stopDisabled, project }) => {
  const handleStopClick = e => {
    if (startTime === 0) {
      return;
    }
    let end = new Date().getTime();
    let updatedProjectHours;
    if (project.id && project.startTime > 0) {
      updatedProjectHours = Number(project.hoursToday) || 0;
      updatedProjectHours += (end - project.startTime) / 3600000;
      localStorage.setItem("projectStartTime", 0);
      localStorage.setItem("projectHoursToday", updatedProjectHours);
    }
    // adding seconds to hoursToday
    let updatedHoursToday = Number(hoursToday) || 0;
    updatedHoursToday += (end - startTime) / 3600000;
    localStorage.setItem("startTime", 0);
    localStorage.setItem("hoursToday", updatedHoursToday.toFixed(3));
    stop(updatedHoursToday, updatedProjectHours);
  };
  return (
    <ActionButton onClick={handleStopClick} disabled={stopDisabled}>
      Stop
    </ActionButton>
  );
};

export default StopButton;
