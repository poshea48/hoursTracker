import axios from "axios";
import { GET_PROJECT, REMOVE_PROJECT } from "./types";
import getDateForDb from "../../utils/getDateForDb";

export const getProject = projectName => dispatch => {
  axios
    .get("/api/hours/project/details", { params: { projectName } })
    .then(res => {
      let projectData = res.data[0];
      projectData.dateToday = getDateForDb();

      return dispatch({
        type: GET_PROJECT,
        payload: res.data[0]
      });
    })
    .catch(err => console.log(err));
};

export const removeProject = () => dispatch => {
  return dispatch({
    type: REMOVE_PROJECT
  });
};

// export const getDailyChartForProject = (
//   hoursToday,
//   dateToday,
//   project
// ) => dispatch => {
//   dispatch(setChartLoading());
//   const date = getDateForDb(dateToday);
//   axios
//     .get(`/api/hours/${project.id}/daily`, { params: { today: date } })
//     .then(res => {
//       const dailyData = [...res.data];
//       dailyData[dailyData.length - 1].hours += Number(hoursToday);
//       return dispatch({
//         type: GET_DAILY_PROJECT,
//         payload: res.data
//       });
//     });
// };
