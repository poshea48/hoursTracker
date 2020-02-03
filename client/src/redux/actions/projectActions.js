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
        payload: {
          active: true,
          id: projectData.id,
          name: projectData.name,
          totalHours: projectData.total_hrs,
          hoursToday: projectData.hours_today
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
