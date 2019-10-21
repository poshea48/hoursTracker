import axios from "axios";
import {
  GET_DAILY,
  GET_WEEKLY,
  GET_MONTHLY,
  CHART_LOADING,
  GET_ALL_PROJECTS,
  GET_DAILY_PROJECT
} from "./types";
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
      dailyData[dailyData.length - 1].hours += Number(hoursToday);
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
  const newData = [...data];
  newData[newData.length - 1].hours = hoursToday;
  dispatch({
    type: GET_DAILY,
    payload: newData
  });
};

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

export const getDailyChartForProject = project => dispatch => {
  dispatch(setChartLoading());
  const { id, hoursToday, dateToday } = project;
  axios
    .get(`/api/hours/project/daily/${id}`, { params: { today: dateToday } })
    .then(res => {
      const dailyData = [...res.data];
      dailyData[dailyData.length - 1].hours += Number(hoursToday);
      return dispatch({
        type: GET_DAILY_PROJECT,
        payload: res.data
      });
    })
    .catch(err => console.log("error in getDailyChartForProject"));
};

export const getAllProjects = () => dispatch => {
  axios
    .get("/api/hours/projects")
    .then(res => {
      return dispatch({
        type: GET_ALL_PROJECTS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ALL_PROJECTS,
        payload: []
      })
    );
};

// export const changeProject = projectName => dispatch => {
//   return dispatch({
//     type: CHANGE_PROJECT,
//     payload: projectName
//   });
// };

// const addProject = projectData => dispatch => {
//   axios
//     .post("/api/hours/add_project", projectData)
//     .then(res =>
//       dispatch({
//         type: GET_PROJECT,
//         payload: res.data
//       })
//     )
//     .catch(err =>
//       dispatch({
//         type: GET_PROJECT,
//         payload: null
//       })
//     );
// };
