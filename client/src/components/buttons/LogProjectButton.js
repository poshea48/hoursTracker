import React from "react";
import { ProjectButton } from "../styles/ActionButton";
import getTodaysDate from "../../utils/getTodaysDate";

const logProjectFunc = (id, hours, startTime, func, date) => {
  let addedHours = 0;
  let dateToday = date || getTodaysDate();
  // in case log button is hit while timing??? not sure if I like this
  if (startTime > 0) {
    addedHours = new Date().getTime() - startTime;
  }
  localStorage.setItem("projectHoursToday", 0);
  localStorage.setItem("projectStartTime", 0);
  localStorage.setItem("projectId", null);

  func(id, hours + addedHours, dateToday);
};

const LogProjectButton = ({ log, startTime, id, hoursToday, logDisabled }) => {
  const handleLogClick = () => {
    logProjectFunc(id, hoursToday, startTime, log);
  };
  return (
    <ProjectButton onClick={handleLogClick} disabled={logDisabled}>
      Log Project
    </ProjectButton>
  );
};

export { logProjectFunc };
export default LogProjectButton;
