import React, { Component } from "react";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { connect } from "react-redux";
import FlashMessage from "./FlashMessage";
import Header from "./Header";
import getTodaysDate from "../utils/getTodaysDate";
import ButtonNav from "../buttons/ButtonNav";
import Navbar from "./Navbar/Navbar";
import Graph from "../charts/Graph";
import NavHistory from "./NavHistory";
import { getDailyChart, updateTodaysData } from "../redux/actions/chartActions";
import {
  startTimer,
  stopTimer,
  resetTimer,
  logHours,
  updateTimer,
  archiveHours
} from "../redux/actions/timerActions";
import { logoutUser } from "../redux/actions/authActions";

import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

class MainPage extends Component {
  state = {
    flash: ""
  };

  onLogoutClick = e => {
    let message = "Logout has been disabled";
    this.setState({ flash: message });
    return;
    e && e.preventDefault();
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

  removeFlashMessage = e => {
    e.preventDefault();
    this.setState({ flash: "" });
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

    this.props.getDailyChart(localData.hoursToday, localData.dateToday);
    this.props.updateTimer(localData);

    // Archive hours
    if (new Date(localData.dateToday).getDate() === 7) {
      return this.props.timer.archived ? null : this.props.archiveHours();
    }
  }

  // Check if hoursToday in timer object changed, if so then update daily chart
  componentDidUpdate(prevProps) {
    console.log("updating");
    // disabling login/logout
    // if (localStorage.jwtTokenHoursTracker) {
    //   setAuthToken(localStorage.jwtTokenHoursTracker);
    //   const decoded = jwt_decode(localStorage.jwtTokenHoursTracker);
    //
    //   // Check for expired token
    //   const currentTime = Date.now() / 1000;
    //   if (decoded.exp < currentTime) {
    //     this.onLogoutClick();
    //   }
    // }

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
    // const decoded = jwt_decode(localStorage.jwtTokenHoursTracker);
    // const currentTime = Date.now() / 1000;
    const { start, stop, reset, log } = this.props.timer.disabled;
    const { chartType, data, loading } = this.props.chart;
    const actions = {
      Start: {
        id: "startId",
        action: this.handleStartClick,
        disabled: start
      },
      Stop: {
        id: "stopId",
        action: this.handleStopClick,
        disabled: stop
      },
      Reset: {
        id: "resetId",
        action: this.handleResetClick,
        disabled: reset
      },
      "Log Hours": {
        id: "logId",
        action: this.handleLogClick,
        disabled: log
      }
    };
    return (
      <div>
        <div className="main">
          <Navbar onLogoutClick={this.onLogoutClick} auth={this.props.auth} />
          {this.state.flash && (
            <FlashMessage
              message={this.state.flash}
              remove={this.removeFlashMessage}
            />
          )}
          <Header />
          <ButtonNav
            actions={actions}
            startDisabled={start}
            stopDisabled={stop}
            resetDisabled={reset}
            logDisabled={log}
            startTimer={this.handleStartClick}
            stopTimer={this.handleStopClick}
            resetTimer={this.handleResetClick}
            logHours={this.handleLogClick}
          />

          <NavHistory chartType={chartType} />
          {loading || typeof data === "undefined" ? (
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
  archiveHours: PropTypes.func.isRequired,
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
    logoutUser,
    archiveHours
  }
)(MainPage);
