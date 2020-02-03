import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getDailyChart,
  getWeeklyChart,
  getMonthlyChart,
  getDailyChartForProject,
  getWeeklyChartForProject,
  getMonthlyChartForProject
} from "../../redux/actions/chartActions";
import DropDown from "../styles/DropDown";

const ChartTypeSelect = ({
  project,
  hoursToday,
  dateToday,
  chartType,
  getWeeklyChart,
  getMonthlyChart,
  getDailyChart,
  getDailyChartForProject,
  getWeeklyChartForProject,
  getMonthlyChartForProject
}) => {
  const [chart, changeChart] = useState(chartType || "daily");
  // const project_id = project.active ? project.id : null;

  const handleChartSelect = e => {
    changeChart(e.target.value);
    if (project.active) {
      getProjectChart(e.target.value);
      return;
    }
    if (e.target.value === "weekly") {
      getWeeklyChart();
    } else if (e.target.value === "monthly") {
      getMonthlyChart();
    } else {
      getDailyChart(hoursToday, dateToday);
    }
  };

  const getProjectChart = chartType => {
    if (chartType === "weekly") {
      getWeeklyChartForProject(project.id, dateToday);
    } else if (chartType === "monthly") {
      getMonthlyChartForProject(project.id, dateToday);
    } else {
      const loggedHours = project.hoursToday;
      getDailyChartForProject(project.id, loggedHours, dateToday);
    }
  };

  return (
    <DropDown onChange={handleChartSelect} value={chart}>
      <option value="daily">Daily Chart</option>
      <option value="weekly">Weekly Chart</option>
      <option value="monthly">Monthly Chart</option>
    </DropDown>
  );
};

ChartTypeSelect.propTypes = {
  getDailyChart: PropTypes.func.isRequired,
  getWeeklyChart: PropTypes.func.isRequired,
  getMonthlyChart: PropTypes.func.isRequired,
  getDailyChartForProject: PropTypes.func.isRequired,
  getWeeklyChartForProject: PropTypes.func.isRequired,
  getMonthlyChartForProject: PropTypes.func.isRequired
};

const mapStateToProps = ({ timer, project, chart }) => {
  return {
    hoursToday: timer.hoursToday,
    dateToday: timer.dateToday,
    chartType: chart.chartType,
    project
  };
};

export default connect(mapStateToProps, {
  getDailyChart,
  getWeeklyChart,
  getMonthlyChart,
  getDailyChartForProject,
  getWeeklyChartForProject,
  getMonthlyChartForProject
})(ChartTypeSelect);
