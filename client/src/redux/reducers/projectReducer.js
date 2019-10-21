import { GET_PROJECT, REMOVE_PROJECT } from "../actions/types";

const initialState = {
  active: false,
  id: null,
  name: "",
  startTime: 0,
  hoursToday: 0,
  dateToday: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROJECT:
      return {
        ...state,
        active: true,
        ...payload
      };
    case REMOVE_PROJECT:
      return initialState;
    default:
      return {
        ...state
      };
  }
};
