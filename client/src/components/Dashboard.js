import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../components/common/Spinner";
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

const Dashboard = ({
  auth,
  timer,
  chart,
  project,
  errors,
  getDailyChart,
  updateTimer,
  getAllProjects,
  archiveHours
}) => {
  // const decoded = jwt_decode(localStorage.jwtTokenHoursTracker);
  // const currentTime = Date.now() / 1000;
  const { hoursToday, dateToday } = timer;
  const { chartType, data, loading } = chart;

  // componentDidMount
  useEffect(() => {
    const localData = getDataFromLocal();
    getDailyChart(localData.hoursToday, localData.dateToday);
    updateTimer(localData);
    getAllProjects();

    // Archive hours
    // TODO => setup cron job
    if (new Date(localData.dateToday).getDate() === 7) {
      return timer.archived ? null : archiveHours();
    }
  }, []);

  // componentDidUpdate
  useEffect(() => {
    if (chartType === "daily") {
      getDailyChart(hoursToday, dateToday);
    }
  }, [hoursToday]);

  useEffect(() => {
    if (!dateToday) {
      const localData = getDataFromLocal();
      getDailyChart(localData.hoursToday, localData.dateToday);
      updateTimer(localData);
    }
  }, [dateToday]);

  useEffect(() => {
    // if proctive.active => get chart for project
    // else getDailyChart
  }, [project.active]);

  const getDataFromLocal = () => {
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

  return (
    <Layout auth={auth}>
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
};

Dashboard.propTypes = {
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
})(Dashboard);
