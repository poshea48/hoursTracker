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
  updateTodaysData,
  getAllProjects
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

  async componentDidMount() {
    const localData = this.getDataFromLocal();
    await this.props.getDailyChart(localData.hoursToday, localData.dateToday);
    await this.props.updateTimer(localData);
    this.props.getAllProjects();

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
    const { chartType, data, loading } = this.props.chart;
    const { project } = this.props;
    return (
      <Layout auth={this.props.auth}>
        <Header />
        <ButtonNav />

        <ChartNavigation
          chartType={chartType}
          project={project.name || "total"}
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
  getAllProjects: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, {
  getDailyChart,
  getWeeklyChart,
  getMonthlyChart,
  getAllProjects,
  updateTodaysData,
  startTimer,
  stopTimer,
  resetTimer,
  logHours,
  updateTimer,
  logoutUser,
  archiveHours
})(MainPage);
