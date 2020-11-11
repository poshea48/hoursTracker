import axios from "axios";
import { GET_PROJECT, REMOVE_PROJECT } from "./types";
import getDateForDb from "../../utils/getDateForDb";

export const getProject = projectId => dispatch => {
  axios
    .get("/api/hours/project/details", { params: { projectId } })
    .then(res => {
      let projectData = res.data[0];
      projectData.dateToday = getDateForDb();
      const totalHours = projectData.total_hrs
        ? parseFloat(projectData.total_hrs.toFixed(1))
        : 0;
      const hoursToday = projectData.hours_today
        ? parseFloat(projectData.hours_today.toFixed(2))
        : 0;
      return dispatch({
        type: GET_PROJECT,
        payload: {
          active: true,
          id: projectData.id,
          name: projectData.name,
          totalHours,
          hoursToday
        }
      });
    })
    .catch(err => console.log(err));
};

export const removeProject = () => dispatch => {
  return dispatch({
    type: REMOVE_PROJECT
  });
};

// export const changeProject = projectName => dispatch => {
//   return dispatch({
//     type: CHANGE_PROJECT,
//     payload: projectName
//   });
// };
