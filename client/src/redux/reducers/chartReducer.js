import {
  GET_DAILY,
  GET_WEEKLY,
  GET_MONTHLY,
  CHART_LOADING,
  GET_ALL_PROJECTS,
  ADD_PROJECT,
  GET_DAILY_PROJECT
} from "../actions/types";

const initialState = {
  chartType: "",
  data: [],
  loading: false,
  project: "total",
  projects: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHART_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_DAILY:
      return {
        ...state,
        chartType: "daily",
        data: action.payload,
        loading: false
      };
    case GET_WEEKLY:
      return {
        ...state,
        chartType: "weekly",
        data: action.payload,
        loading: false
      };
    case GET_MONTHLY:
      return {
        ...state,
        chartType: "monthly",
        data: action.payload,
        loading: false
      };
    case GET_ALL_PROJECTS:
      return {
        ...state,
        projects: action.payload
      };
    case ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload]
      };
    case GET_DAILY_PROJECT:
      return {
        ...state,
        chartType: "daily",
        data: action.payload,
        loading: false
      };

    default:
      return state;
  }
};
