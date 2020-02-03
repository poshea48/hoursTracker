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
import ProjectDisplay from "./projects/ProjectDisplay";
import {
  getDailyChart,
  getWeeklyChart,
  getMonthlyChart,
  getDailyChartForProject,
  updateTodaysData,
  getAllProjects,
  getWeeklyChartForProject,
  getMonthlyChartForProject
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
  getDailyChartForProject,
  getWeeklyChartForProject,
  getMonthlyChartForProject,
  getAllProjects,
  updateTimer,
  archiveHours
}) => {
  // const decoded = jwt_decode(localStorage.jwtTokenHoursTracker);
  // const currentTime = Date.now() / 1000;
  const { hoursToday, dateToday } = timer;
  const { chartType, data, loading } = chart;
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
    const {
      dateToday,
      hoursToday,
      startTime,
      projectHoursToday,
      projectId,
      projectStartTime
    } = localStorage;

    return {
      dateToday,
      hoursToday,
      startTime,
      projectHoursToday,
      projectId,
      projectStartTime
    };
  };

  useEffect(() => {
    console.log("getting all projects");
    getAllProjects();
  }, [getAllProjects]);

  useEffect(() => {
    if (dateToday) {
      getDailyChart(hoursToday, dateToday);
    } else {
      const localData = getDataFromLocal();
      getDailyChart(localData.hoursToday, localData.dateToday);
      updateTimer(localData);
    }
  }, [hoursToday, dateToday, getDailyChart, updateTimer]);

  // if project is selected project.active will become true,
  // then grab project details (from project (logged hours) and timer/project (non-logged hours))
  useEffect(() => {
    if (project.active) {
      getProjectChart(project, chartType);
    } else {
      getTotalHoursChart(chartType || "daily", hoursToday, dateToday);
    }
  }, [
    project.active,
    project.hoursToday,
    project.id,
    hoursToday,
    dateToday,
    chartType
  ]);

  const getProjectChart = (project, chartType) => {
    switch (chartType) {
      case "daily":
        const loggedHours = project.hoursToday;
        getDailyChartForProject(project.id, loggedHours, dateToday);
        return;
      case "weekly":
        getWeeklyChartForProject(project.id, dateToday);
        return;
      case "monthly":
        getMonthlyChartForProject(project.id, dateToday);
        return;
      default:
        throw new Error(`Unknown chart type ${chartType}`);
    }
  };

  const getTotalHoursChart = (chartType, hoursToday, dateToday) => {
    switch (chartType) {
      case "daily":
        getDailyChart(hoursToday, dateToday);
        return;
      case "weekly":
        getWeeklyChart();
        return;
      case "monthly":
        getMonthlyChart();
        return;
      default:
        throw new Error(`Unknown chart type ${chartType}`);
    }
  };

  return (
    <Layout auth={auth}>
      <Header />
      <ButtonNav />
      <ChartNavigation
        chartType={chartType}
        projectName={project.name || "total"}
      />
      {loading || typeof data === "undefined" ? (
        <Spinner />
      ) : (
        <DisplayGraph chartType={chartType} data={data} />
      )}
      {project.active && (
        <ProjectDisplay
          projectName={project.name}
          projectHours={project.totalHours}
        />
      )}
    </Layout>
  );
};

Dashboard.propTypes = {
  getDailyChart: PropTypes.func.isRequired,
  getWeeklyChart: PropTypes.func.isRequired,
  getMonthlyChart: PropTypes.func.isRequired,
  getAllProjects: PropTypes.func.isRequired,
  getDailyChartForProject: PropTypes.func.isRequired,
  getWeeklyChartForProject: PropTypes.func.isRequired,
  getMonthlyChartForProject: PropTypes.func.isRequired,
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
  getDailyChartForProject,
  getWeeklyChartForProject,
  getMonthlyChartForProject,
  updateTodaysData,
  startTimer,
  stopTimer,
  resetTimer,
  logHours,
  updateTimer,
  logoutUser,
  archiveHours
})(Dashboard);
