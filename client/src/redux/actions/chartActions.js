import axios from 'axios';
import { GET_DAILY, GET_WEEKLY, GET_MONTHLY, CHART_LOADING } from './types'

export const getDailyChart = (hoursToday) => dispatch => {
  dispatch(setChartLoading())
  axios
    .get('/api/hours/daily')

    .then(res => {
      const dailyData = [...res.data]
      console.log(dailyData)
      dailyData[dailyData.length - 1].hours += hoursToday
      return dispatch({
        type: GET_DAILY,
        payload: res.data
      })
    }
    )
    .catch(err =>
      dispatch({
        type: GET_DAILY,
        payload: {}
      })
    )
}

export const updateTodaysData = (data, hoursToday) => dispatch => {
  console.log(data)
  const newData = [...data]
  newData[newData.length - 1].hours = hoursToday
  dispatch({
    type: GET_DAILY,
    payload: newData
  })
}

// export const addToday = (hours) => dispatch => {
//   return {
//     type: ADD_TODAY,
//     payload: hours
//   }
// }

export const getWeeklyChart = () => dispatch => {
  dispatch(setChartLoading())
  axios
    .get('/api/hours/weekly')
    .then(res =>
      dispatch({
        type: GET_WEEKLY,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_WEEKLY,
        payload: null
      })
    )
}

export const getMonthlyChart = () => dispatch => {
  dispatch(setChartLoading())
  axios
    .get('/api/hours/monthly')
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
    )
}

const setChartLoading = () => {
  return {
    type: CHART_LOADING
  }
}
