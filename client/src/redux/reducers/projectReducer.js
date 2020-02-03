import { GET_PROJECT, REMOVE_PROJECT } from "../actions/types";

const initialState = {
  active: false,
  id: null,
  name: "",
  totalHours: 0,
  hoursToday: 0
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROJECT:
      return {
        ...state,
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
