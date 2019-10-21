import axios from "axios";
import {
  START_TIMER,
  STOP_TIMER,
  RESET_TIMER,
  UPDATE_TIMER,
  HOURS_ARCHIVED
} from "./types";
import getTodaysDate from "../../utils/getTodaysDate";

export const startTimer = () => dispatch => {
  const today = getTodaysDate();
  dispatch({
    type: START_TIMER,
    payload: { time: new Date().getTime(), date: today }
  });
};

export const stopTimer = hoursToday => dispatch => {
  dispatch({
    type: STOP_TIMER,
    payload: Number(hoursToday.toFixed(3))
  });
};

export const updateTimer = ({
  hoursToday,
  dateToday,
  startTime
}) => dispatch => {
  hoursToday = Number(hoursToday);
  startTime = Number(startTime);
  const today = new Date();
  let forced = today.toDateString() !== new Date(dateToday).toDateString();
  return dispatch({
    type: UPDATE_TIMER,
    payload: { dateToday, hoursToday, startTime, forced }
  });
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

export const archiveHours = () => dispatch => {
  console.log("archiving...");
  axios
    .post("/api/hours/archive-hours")
    .then(res => {
      return dispatch({ type: HOURS_ARCHIVED });
    })
    .catch(err => console.log("hours not archived, something happened"));
};
