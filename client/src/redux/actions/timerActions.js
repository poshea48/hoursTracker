import axios from "axios";
import { START_TIMER, STOP_TIMER, RESET_TIMER, UPDATE_TIMER } from "./types";

export const startTimer = () => dispatch => {
  dispatch({
    type: START_TIMER,
    payload: new Date().getTime()
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

  return dispatch({
    type: UPDATE_TIMER,
    payload: { dateToday, hoursToday, startTime }
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
