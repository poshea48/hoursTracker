import React from "react";
import { ProjectButton } from "../styles/ActionButton";

const StopProjectButton = ({
  stop,
  startTime,
  hoursToday,
  stopDisabled,
  id
}) => {
  const handleStopClick = e => {
    if (startTime === 0) {
      return;
    }
    let end = new Date().getTime();
    // adding seconds to hoursToday
    let updatedProjectHours = Number(hoursToday) || 0;
    updatedProjectHours += (end - startTime) / 3600000;
    localStorage.setItem("projectStartTime", 0);
    localStorage.setItem("projectHoursToday", updatedProjectHours.toFixed(3));

    stop(updatedProjectHours);
  };
  return (
    <ProjectButton onClick={handleStopClick} disabled={stopDisabled}>
      Stop Project
    </ProjectButton>
  );
};

export default StopProjectButton;
