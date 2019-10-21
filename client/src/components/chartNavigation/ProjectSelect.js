import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getAllProjects,
  getDailyChartForProject
} from "../../redux/actions/chartActions";
import { getProject, removeProject } from "../../redux/actions/projectActions";
import DropDown from "../styles/DropDown";

const ProjectSelect = ({
  projects,
  project,
  chartType,
  getAllProjects,
  getDailyChartForProject,
  getProject,
  removeProject
}) => {
  let displayProjects = projects.map(p => (
    <option key={p} value={p}>
      {p}
    </option>
  ));

  const [selected, changeSelected] = useState("total");

  useEffect(() => {
    getAllProjects();
  }, []);

  useEffect(() => {
    console.log(project);
    if (!project.active) return;
    if (chartType === "daily") {
      console.log("daily chart for project");
      getDailyChartForProject(project);
    }
  }, [project.name, project.active]);

  const handleSelect = async e => {
    if (e.target.value === "create-project") {
      console.log("project create form");
      changeSelected("total");
      removeProject();
      return;
    } else if (e.target.value === "total") {
      console.log("removing project");
      changeSelected(e.target.value);

      removeProject();
    } else {
      changeSelected(e.target.value);

      await getProject(e.target.value);
    }
    // changeSelected(e.target.value);
  };

  const getProjectChart = () => {};

  return (
    <DropDown onChange={handleSelect} value={selected}>
      <option value="total">Total Hours</option>
      {displayProjects}
      <option value="create-project">+ Project</option>
    </DropDown>
  );
};

ProjectSelect.propTypes = {
  getAllProjects: PropTypes.func.isRequired,
  getDailyChartForProject: PropTypes.func.isRequired,
  getProject: PropTypes.func.isRequired,
  removeProject: PropTypes.func.isRequired
};

const mapStateToProps = ({ chart, project }) => {
  return {
    projects: chart.projects,
    chartType: chart.chartType,
    project
  };
};

export default connect(
  mapStateToProps,
  { getAllProjects, getDailyChartForProject, getProject, removeProject }
)(ProjectSelect);
