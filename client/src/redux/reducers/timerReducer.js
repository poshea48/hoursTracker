import {
  START_TIMER,
  START_PROJECT_TIMER,
  STOP_TIMER,
  STOP_PROJECT_TIMER,
  RESET_TIMER,
  RESET_PROJECT,
  UPDATE_TIMER,
  HOURS_ARCHIVED
} from "../actions/types";

const initialState = {
  dateToday: "",
  hoursToday: 0, //Number(localStorage.getItem('hoursToday')) || 0,
  startTime: 0,
  forceLog: false,
  archived: false,
  project: {
    id: null,
    startTime: 0,
    hoursToday: 0,
    startDisabled: false,
    stopDisabled: true,
    logDisabled: true
  },
  disabled: {
    start: false,
    stop: true,
    reset: true,
    log: true
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case START_TIMER:
      return {
        ...state,
        dateToday: action.payload.dateToday,
        startTime: action.payload.startTime,
        disabled: {
          start: true,
          stop: false,
          reset: true,
          log: true
        }
      };
    case START_PROJECT_TIMER:
      // if startTotal start project and total
      const projectData = {
        ...state.project,
        id: action.payload.id,
        name: action.payload.name,
        startTime: action.payload.startTime,
        startDisabled: true,
        stopDisabled: false,
        logDisabled: true
      };
      if (action.payload.startTotal) {
        return {
          ...state,
          dateToday: action.payload.dateToday,
          startTime: action.payload.startTime,
          disabled: {
            start: true,
            stop: false,
            reset: true,
            log: true
          },
          project: projectData
        };
      } else {
        return {
          ...state,
          project: projectData
        };
      }
    case STOP_TIMER:
      let totalData = {
        ...state,
        hoursToday: action.payload.hoursToday,
        startTime: 0,
        disabled: {
          start: false,
          stop: true,
          reset: false,
          log: false
        }
      };
      if (action.payload.projectHoursToday) {
        return {
          ...totalData,
          project: {
            ...state.project,
            startTime: 0,
            hoursToday: action.payload.projectHoursToday,
            startDisabled: false,
            stopDisabled: true,
            logDisabled: false
          }
        };
      } else {
        return {
          ...totalData
        };
      }
    case STOP_PROJECT_TIMER:
      return {
        ...state,
        project: {
          ...state.project,
          hoursToday: action.payload,
          startTime: 0,
          startDisabled: false,
          stopDisabled: true,
          logDisabled: false
        }
      };

    case UPDATE_TIMER:
      const {
        hoursToday,
        startTime,
        forced,
        projectHoursToday,
        projectId,
        projectStartTime
      } = action.payload;
      let disabled;
      let project = {
        id: projectId,
        startTime: projectStartTime,
        hoursToday: projectHoursToday,
        startDisabled: true,
        stopDisabled: true,
        logDisabled: true
      };
      if (forced) {
        disabled = {
          start: true,
          stop: true,
          reset: false,
          log: false
        };
      } else {
        disabled = {
          start: startTime > 0,
          stop: startTime === 0,
          reset: startTime === 0 && hoursToday === 0,
          log: startTime === 0 && hoursToday === 0
        };
        project.startDisabled = projectStartTime > 0;
        project.stopDisabled = projectStartTime === 0;
        project.logDisabled = project.hoursToday === 0;
      }
      return {
        ...state,
        ...action.payload,
        forceLog: forced,
        disabled: disabled,
        project
      };
    case RESET_TIMER:
      return {
        ...state,
        dateToday: "",
        hoursToday: 0,
        startTime: 0,
        forceLog: false,
        disabled: {
          start: false,
          stop: true,
          reset: true,
          log: true
        }
      };
    case RESET_PROJECT:
      return {
        ...state,
        project: {
          id: null,
          startTime: 0,
          hoursToday: 0,
          startDisabled: false,
          stopDisabled: true
        }
      };
    case HOURS_ARCHIVED:
      return {
        ...state,
        archived: true
      };
    default:
      return state;
  }
};
