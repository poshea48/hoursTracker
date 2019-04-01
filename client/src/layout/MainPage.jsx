import React, { Component } from "react";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { connect } from "react-redux";
import Header from "./Header";
import getTodaysDate from "../utils/getTodaysDate";
import StartButton from "../buttons/StartButton";
import StopButton from "../buttons/StopButton";
import ResetButton from "../buttons/ResetButton";
import LogButton from "../buttons/LogButton";
import Navbar from "./Navbar";
import Graph from "../charts/Graph";
import NavHistory from "./NavHistory";
import { getDailyChart, updateTodaysData } from "../redux/actions/chartActions";
import {
  startTimer,
  stopTimer,
  resetTimer,
  logHours,
  updateTimer
} from "../redux/actions/timerActions";
import { logoutUser } from "../redux/actions/authActions";
import axios from "axios";

import jwt_decode from "jwt-decode";

class MainPage extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    const { hoursToday } = this.props.timer;
    if (hoursToday > 0) {
      this.props.logHours(hoursToday);
    }
    ["hoursToday", "startTime", "dateToday"].forEach(i =>
      localStorage.removeItem(i)
    );
    console.log("should be logging out");
    this.props.logoutUser();
  };

  handleStartClick = e => {
    let dateToday =
      localStorage.getItem("dateToday") ||
      this.props.timer.dateToday ||
      getTodaysDate();
    let startTime = new Date().getTime();
    localStorage.setItem("startTime", startTime);
    localStorage.setItem("dateToday", dateToday);
    this.props.startTimer(startTime);
  };

  handleStopClick = e => {
    if (this.props.timer.startTime === 0) {
      return;
    }
    let end = new Date().getTime();
    // adding seconds to hoursToday
    let hoursToday = Number(this.props.timer.hoursToday) || 0;
    hoursToday += (end - this.props.timer.startTime) / 3600000;
    localStorage.setItem("startTime", 0);
    localStorage.setItem("hoursToday", hoursToday.toFixed(3));
    this.props.stopTimer(hoursToday);
  };

  handleResetClick = e => {
    localStorage.setItem("hoursToday", 0);
    localStorage.setItem("dateToday", "");
    this.props.resetTimer();
  };

  handleLogClick = () => {
    const { hoursToday, dateToday, startTime } = this.props.timer;
    let addedHours = 0;
    if (startTime > 0) {
      addedHours = new Date().getTime() - startTime;
    }
    localStorage.setItem("hoursToday", 0);
    localStorage.setItem("dateToday", "");
    localStorage.setItem("startTime", 0);

    this.props.logHours(hoursToday + addedHours, dateToday);
  };

  getDataFromLocal = () => {
    if (
      !localStorage.getItem("dateToday") ||
      localStorage.getItem("dateToday") === ""
    ) {
      localStorage.setItem("dateToday", getTodaysDate());
    }

    if (!localStorage.getItem("hoursToday")) {
      localStorage.setItem("hoursToday", "0");
    }

    if (!localStorage.getItem("startTime")) {
      localStorage.setItem("startTime", "0");
    }
    const { dateToday, hoursToday, startTime } = localStorage;

    return { dateToday, hoursToday, startTime };
  };

  componentDidMount() {
    console.log("mounting");
    const localData = this.getDataFromLocal();
    // Archive hours
    // if (new Date(localData.dateToday).getDate() === 6) {
    //   axios.post("api/hours/archive-hours");
    // }
    this.props.getDailyChart(localData.hoursToday, localData.dateToday);
    this.props.updateTimer(localData);
  }

  // Check is hoursToday in timer object changed, if so then update daily chart
  // After reset and log hours dbCheck is set to false, returns updated chart with logged hours
  componentDidUpdate(prevProps) {
    console.log("updating");

    if (!this.props.timer.dateToday) {
      const localData = this.getDataFromLocal();
      console.log(localData);
      this.props.getDailyChart(localData.hoursToday, localData.dateToday);
      return this.props.updateTimer(localData);
    }
    if (
      prevProps.timer.hoursToday !== this.props.timer.hoursToday &&
      this.props.chart.chartType === "daily"
    ) {
      const { hoursToday, dateToday } = this.props.timer;
      return this.props.getDailyChart(hoursToday, dateToday);
    }
  }

  render() {
    const decoded = jwt_decode(localStorage.jwtTokenHoursTracker);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      // const { hoursToday, dateToday } = store.getState().timer;

      // if (hoursToday > 0) {
      //   store.dispatch(logHours(hoursToday, dateToday));
      // }
      this.props.logoutUser();
    }
    const { start, stop, reset, log } = this.props.timer.disabled;
    const { chartType, data, loading } = this.props.chart;
    return (
      <div>
        <div className="main">
          <Navbar onLogoutClick={this.onLogoutClick} auth={this.props.auth} />
          <Header />
          <div className="actions d-flex justify-content-center">
            <StartButton disabled={start} startTimer={this.handleStartClick} />
            <StopButton disabled={stop} stopTimer={this.handleStopClick} />
            <ResetButton disabled={reset} resetTimer={this.handleResetClick} />
            <LogButton disabled={log} logHours={this.handleLogClick} />
          </div>
          <NavHistory chartType={chartType} />
          {loading || typeof data === "undefined " ? (
            <Spinner />
          ) : (
            <div className="chart">
              <Graph chartType={chartType} data={data} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

MainPage.propTypes = {
  getDailyChart: PropTypes.func.isRequired,
  updateTodaysData: PropTypes.func.isRequired,
  updateTimer: PropTypes.func.isRequired,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  resetTimer: PropTypes.func.isRequired,
  logHours: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  chart: PropTypes.object.isRequired,
  timer: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    chart: state.chart,
    timer: state.timer,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  {
    getDailyChart,
    updateTodaysData,
    startTimer,
    stopTimer,
    resetTimer,
    logHours,
    updateTimer,
    logoutUser
  }
)(MainPage);
