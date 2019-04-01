import axios from "axios";
import { GET_DAILY, GET_WEEKLY, GET_MONTHLY, CHART_LOADING } from "./types";
import getDateForDb from "../../utils/getDateForDb";

export const getDailyChart = (hoursToday, dateToday) => dispatch => {
  dispatch(setChartLoading());
  const date = getDateForDb(dateToday);
  axios
    .get(`/api/hours/daily`, {
      params: {
        today: date
      }
    })
    .then(res => {
      const dailyData = [...res.data];
      dailyData[dailyData.length - 1].hours += hoursToday;
      return dispatch({
        type: GET_DAILY,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_DAILY,
        payload: {}
      })
    );
};

export const updateTodaysData = (data, hoursToday) => dispatch => {
  console.log(data);
  const newData = [...data];
  newData[newData.length - 1].hours = hoursToday;
  dispatch({
    type: GET_DAILY,
    payload: newData
  });
};

// export const addToday = (hours) => dispatch => {
//   return {
//     type: ADD_TODAY,
//     payload: hours
//   }
// }

export const getWeeklyChart = () => dispatch => {
  dispatch(setChartLoading());
  axios
    .get("/api/hours/weekly")
    .then(res =>
      dispatch({
        type: GET_WEEKLY,
        payload: res.data.slice(Math.max(res.data.length - 5, 1))
      })
    )
    .catch(err =>
      dispatch({
        type: GET_WEEKLY,
        payload: null
      })
    );
};

export const getMonthlyChart = () => dispatch => {
  dispatch(setChartLoading());
  axios
    .get("/api/hours/monthly")
    .then(res =>
      dispatch({
        type: GET_MONTHLY,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_MONTHLY,
        payload: null
      })
    );
};

const setChartLoading = () => {
  return {
    type: CHART_LOADING
  };
};
