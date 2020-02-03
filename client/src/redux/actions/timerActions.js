import axios from "axios";
import {
  START_TIMER,
  START_PROJECT_TIMER,
  STOP_TIMER,
  STOP_PROJECT_TIMER,
  RESET_TIMER,
  RESET_PROJECT,
  UPDATE_TIMER,
  HOURS_ARCHIVED
} from "./types";
import getTodaysDate from "../../utils/getTodaysDate";

export const startTimer = (startTime, dateToday) => dispatch => {
  if (!dateToday) {
    dateToday = getTodaysDate();
  }

  dispatch({
    type: START_TIMER,
    payload: { startTime, dateToday }
  });
};

export const startProjectTimer = (
  projectId,
  projectName,
  startTime,
  startTotal
) => dispatch => {
  // if startTotal is true start project and total
  let dateToday = getTodaysDate();
  dispatch({
    type: START_PROJECT_TIMER,
    payload: {
      startTotal,
      id: projectId,
      name: projectName,
      startTime,
      dateToday
    }
  });
};

export const stopTimer = (hoursToday, projectHours) => dispatch => {
  let projectHoursToday = projectHours ? Number(projectHours.toFixed(3)) : null;
  dispatch({
    type: STOP_TIMER,
    payload: { hoursToday: Number(hoursToday.toFixed(3)), projectHoursToday }
  });
};

export const stopProjectTimer = hoursToday => dispatch => {
  dispatch({
    type: STOP_PROJECT_TIMER,
    payload: Number(hoursToday.toFixed(3))
  });
};

export const updateTimer = ({
  hoursToday,
  dateToday,
  startTime,
  projectHoursToday,
  projectId,
  projectStartTime
}) => {
  return dispatch => {
    hoursToday = Number(hoursToday);
    startTime = Number(startTime);
    projectHoursToday = Number(projectHoursToday);
    projectId = Number(projectId);
    projectStartTime = Number(projectStartTime);

    const today = new Date();
    let forced = today.toDateString() !== new Date(dateToday).toDateString();
    return dispatch({
      type: UPDATE_TIMER,
      payload: {
        dateToday,
        hoursToday,
        startTime,
        forced,
        projectHoursToday,
        projectId,
        projectStartTime
      }
    });
  };
};

export const resetTimer = () => dispatch => {
  dispatch({
    type: RESET_TIMER
  });
};

export const logHours = (hours, date) => dispatch => {
  axios
    .post("/api/hours/log-hours", { hours, date })
    .then(res =>
      dispatch({
        type: RESET_TIMER
      })
    )
    .catch(err => console.log(err));
};

// add to backend (not yet)

export const logProjectHours = (id, hours, date) => dispatch => {
  axios
    .post("/api/hours/project/log-hours", { projectId: id, hours, date })
    .then(res =>
      dispatch({
        type: RESET_PROJECT
      })
    );
};

export const archiveHours = () => dispatch => {
  console.log("archiving...");
  axios
    .post("/api/hours/archive-hours")
    .then(res => {
      return dispatch({ type: HOURS_ARCHIVED });
    })
    .catch(err => console.log("hours not archived, something happened"));
};
