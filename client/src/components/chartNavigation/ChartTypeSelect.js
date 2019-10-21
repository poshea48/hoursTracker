import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getDailyChart,
  getWeeklyChart,
  getMonthlyChart
} from "../../redux/actions/chartActions";
import DropDown from "../styles/DropDown";

const ChartTypeSelect = ({
  project,
  hoursToday,
  dateToday,
  getWeeklyChart,
  getMonthlyChart,
  getDailyChart
}) => {
  const [chart, changeChart] = useState("daily");
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
    // if (chartType === "weekly") {
    //   getWeeklyChartForProject(project.id);
    // } else if (chartType === "monthly") {
    //   getMonthlyChartForProject(project.id);
    // } else {
    //   getDailyChartForProject(project.hoursToday, project.dateToday);
    // }
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
  getMonthlyChart: PropTypes.func.isRequired
};

const mapStateToProps = ({ timer, project }) => {
  return {
    hoursToday: timer.hoursToday,
    dateToday: timer.dateToday,
    project
  };
};

export default connect(
  mapStateToProps,
  { getDailyChart, getWeeklyChart, getMonthlyChart }
)(ChartTypeSelect);
