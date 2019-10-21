import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Spinner from "../components/common/Spinner";
import { connect } from "react-redux";
import Layout from "../components/layout/Layout";
import Header from "../components/layout/Header";
import getTodaysDate from "../utils/getTodaysDate";
import ButtonNav from "../components/buttons/ButtonNav";
import DisplayGraph from "../components/charts/DisplayGraph";
import ChartNavigation from "../components/chartNavigation/ChartNavigation";
import {
  getDailyChart,
  getWeeklyChart,
  getMonthlyChart,
  updateTodaysData
} from "../redux/actions/chartActions";
import {
  startTimer,
  stopTimer,
  resetTimer,
  logHours,
  updateTimer,
  archiveHours
} from "../redux/actions/timerActions";
import { logoutUser } from "../redux/actions/authActions";

class MainPage extends PureComponent {
  handleStartClick = e => {
    e.preventDefault();
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

  // moved to ChartNavigation component
  // handleChartSelect = e => {
  //   if (e.target.value === "weekly") {
  //     this.props.getWeeklyChart();
  //   } else if (e.target.value === "monthly") {
  //     this.props.getMonthlyChart();
  //   } else {
  //     const { hoursToday, dateToday } = this.props.timer;
  //     this.props.getDailyChart(hoursToday, dateToday);
  //   }
  // };

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
    const localData = this.getDataFromLocal();

    this.props.getDailyChart(localData.hoursToday, localData.dateToday);
    this.props.updateTimer(localData);

    // Archive hours
    // TODO => setup cron job
    if (new Date(localData.dateToday).getDate() === 7) {
      return this.props.timer.archived ? null : this.props.archiveHours();
    }
  }

  // add in shouldComponentUpdate for hoursToday

  // Check if hoursToday in timer object changed, if so then update daily chart
  componentDidUpdate(prevProps) {
    if (!this.props.timer.dateToday) {
      const localData = this.getDataFromLocal();
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

    if (prevProps.project.active && !this.props.project.active) {
      const { hoursToday, dateToday } = this.props.timer;

      return this.props.getDailyChart(hoursToday, dateToday);
    }
  }

  render() {
    // const decoded = jwt_decode(localStorage.jwtTokenHoursTracker);
    // const currentTime = Date.now() / 1000;
    const { start, stop, reset, log } = this.props.timer.disabled;
    const { chartType, data, loading } = this.props.chart;
    const { project } = this.props;
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
      <Layout auth={this.props.auth}>
        <Header />
        <ButtonNav
          actions={actions}
          startDisabled={start}
          stopDisabled={stop}
          resetDisabled={reset}
          logDisabled={log}
        />

        <ChartNavigation
          chartType={chartType}
          project={project.name || "total"}
          handleSelect={this.handleChartSelect}
        />

        {loading || typeof data === "undefined" ? (
          <Spinner />
        ) : (
          <DisplayGraph chartType={chartType} data={data} />
        )}
      </Layout>
    );
  }
}

MainPage.propTypes = {
  getDailyChart: PropTypes.func.isRequired,
  getWeeklyChart: PropTypes.func.isRequired,
  getMonthlyChart: PropTypes.func.isRequired,
  updateTodaysData: PropTypes.func.isRequired,
  updateTimer: PropTypes.func.isRequired,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  resetTimer: PropTypes.func.isRequired,
  logHours: PropTypes.func.isRequired,
  archiveHours: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  chart: PropTypes.object.isRequired,
  timer: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    chart: state.chart,
    timer: state.timer,
    errors: state.errors,
    project: state.project
  };
};

export default connect(
  mapStateToProps,
  {
    getDailyChart,
    getWeeklyChart,
    getMonthlyChart,
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
