import {
  START_TIMER,
  STOP_TIMER,
  RESET_TIMER,
  UPDATE_TIMER,
  HOURS_ARCHIVED
} from "../actions/types";

const initialState = {
  dateToday: "",
  hoursToday: 0, //Number(localStorage.getItem('hoursToday')) || 0,
  startTime: 0,
  forceLog: false,
  archived: false,
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
        dateToday: action.payload.date,
        startTime: action.payload.time,
        disabled: {
          start: true,
          stop: false,
          reset: true,
          log: true
        }
      };
    case STOP_TIMER:
      return {
        ...state,
        hoursToday: action.payload,
        startTime: 0,
        disabled: {
          start: false,
          stop: true,
          reset: false,
          log: false
        }
      };
    case UPDATE_TIMER:
      const today = new Date();
      const { hoursToday, dateToday, startTime } = action.payload;
      let disabled;
      let forced;
      if (today.toDateString() !== new Date(dateToday).toDateString()) {
        disabled = {
          start: true,
          stop: true,
          reset: false,
          log: false
        };
        forced = true;
      } else {
        disabled = {
          start: startTime > 0,
          stop: startTime === 0,
          reset: startTime === 0 && hoursToday === 0,
          log: startTime === 0 && hoursToday === 0
        };
        forced = false;
      }
      return {
        ...state,
        ...action.payload,
        forceLog: forced,
        disabled: disabled
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
    case HOURS_ARCHIVED:
      return {
        ...state,
        archived: true
      };
    default:
      return state;
  }
};
