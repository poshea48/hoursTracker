import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getDailyChart,
  getWeeklyChart,
  getMonthlyChart
} from "../../redux/actions/chartActions";
import "../../css/NavHistory.css";

class NavHistory extends Component {
  handleSelect = e => {
    if (e.target.value === "weekly") {
      this.props.getWeeklyChart();
    } else if (e.target.value === "monthly") {
      this.props.getMonthlyChart();
    } else {
      const { hoursToday, dateToday } = this.props.timer;
      this.props.getDailyChart(hoursToday, dateToday);
    }
  };

  render() {
    const { chartType } = this.props;
    let header;
    if (chartType === "daily") {
      header = "Hours/day";
    } else if (chartType === "weekly") {
      header = "Hours/week";
    } else {
      header = "Hours/month";
    }
    return (
      <div className="nav-history-wrapper">
        <div className="nav-history">
          <h4>{header}</h4>
          <select className="chart-dropdown" onChange={this.handleSelect}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>
    );
  }
}

NavHistory.propTypes = {
  chart: PropTypes.object.isRequired,
  getDailyChart: PropTypes.func.isRequired,
  getMonthlyChart: PropTypes.func.isRequired,
  getWeeklyChart: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    chart: state.chart,
    timer: state.timer
  };
};

export default connect(
  mapStateToProps,
  { getDailyChart, getWeeklyChart, getMonthlyChart }
)(NavHistory);
