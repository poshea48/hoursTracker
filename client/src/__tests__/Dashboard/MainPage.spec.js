import React from "react";
import { shallow } from "enzyme";
import MainPage from "../../Dashboard/MainPage";
import * as timerActions from "../../redux/actions/timerActions";

describe("MainPage", () => {
  let wrapper;
  const props = {
    getDailyChart: jest.fn(),
    updateTodaysData: jest.fn(),
    updateTimer: jest.fn(),
    startTimer: jest.fn(),
    stopTimer: jest.fn(),
    resetTimer: jest.fn(),
    logHours: jest.fn(),
    archiveHours: jest.fn(),
    logoutUser: jest.fn(),
    chart: {
      type: "daily",
      data: {},
      loading: false
    },
    timer: {
      dateToday: "",
      hoursToday: 0,
      startTime: 0,
      forceLog: false,
      archived: false,
      disabled: {
        start: "false",
        stop: "false",
        reset: "false",
        log: "false"
      }
    }
  };
  beforeEach(() => (wrapper = shallow(<MainPage {...props} />)));

  it("should render without crashing", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should disable appropriate buttons", () => {
    const mockEvent = {
      preventDefault: jest.fn()
    };

    // Mock actions we expect to be called

    expect(props.updateTimer.mock.calls.length).toBe(1);
    expect(props.getDailyChart.mock.calls.length).toBe(1);
  });
});
