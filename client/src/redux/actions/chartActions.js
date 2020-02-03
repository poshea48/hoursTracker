import axios from "axios";
import {
  GET_DAILY,
  GET_WEEKLY,
  GET_MONTHLY,
  ADD_PROJECT,
  CHART_LOADING,
  GET_ALL_PROJECTS,
  GET_DAILY_PROJECT,
  GET_WEEKLY_PROJECT,
  GET_MONTHLY_PROJECT
} from "./types";
import getDateForDb from "../../utils/getDateForDb";
import getTodaysDate from "../../utils/getTodaysDate";

export const getDailyChart = (hoursToday, dateToday) => dispatch => {
  if (!hoursToday) hoursToday = 0;
  dispatch(setChartLoading());
  if (!dateToday) dateToday = getTodaysDate();
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
        payload: dailyData
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

// need project id, and non-logged hours, dateToday
export const getDailyChartForProject = (
  projectId,
  loggedHours,
  dateToday
) => dispatch => {
  console.log("inside getDailyChartForProject");
  const date = getDateForDb(dateToday);
  dispatch(setChartLoading());
  axios
    .get(`/api/hours/project/daily/${projectId}`, { params: { today: date } })
    .then(res => {
      const dailyData = [...res.data];
      dailyData[dailyData.length - 1].hours_today += Number(loggedHours);

      return dispatch({
        type: GET_DAILY_PROJECT,
        payload: dailyData
      });
    })
    .catch(err => console.log("error in getDailyChartForProject"));
};

export const getWeeklyChartForProject = (projectId, dateToday) => dispatch => {
  const date = getDateForDb(dateToday);
  dispatch(setChartLoading());

  axios
    .get(`/api/hours/project/weekly/${projectId}`, { params: { today: date } })
    .then(res => {
      return dispatch({
        type: GET_WEEKLY_PROJECT,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_WEEKLY_PROJECT,
        payload: "Could not find Chart"
      })
    );
};

export const getMonthlyChartForProject = (projectId, dateToday) => dispatch => {
  const date = getDateForDb(dateToday);

  dispatch(setChartLoading());
  axios
    .get(`/api/hours/project/monthly/${projectId}`, { params: { today: date } })
    .then(res => {
      return dispatch({
        type: GET_MONTHLY_PROJECT,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_MONTHLY_PROJECT,
        payload: null
      })
    );
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

export const addProject = projectData => dispatch => {
  axios
    .post("/api/hours/add_project", projectData)
    .then(res => {
      return dispatch({
        type: ADD_PROJECT,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: ADD_PROJECT,
        payload: []
      })
    );
};
