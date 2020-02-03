import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  getAllProjects,
  getDailyChartForProject,
  addProject
} from "../../redux/actions/chartActions";
import { getProject, removeProject } from "../../redux/actions/projectActions";
import DropDown from "../styles/DropDown";
import AddProject from "./AddProject";

const Overlay = styled.div`
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  bottom: 0;
  background: transparent;
  width: 100vw;
  height: 100vh;
  transition: opacity 0.3s ease-in-out;
  cursor: pointer;
`;

const ProjectSelect = ({
  projects,
  chartType,
  getAllProjects,
  getProject,
  removeProject,
  addProject
}) => {
  const [selected, changeSelected] = useState(chartType || "total");
  const [toggleAddProject, changeToggle] = useState(false);

  let displayProjects = projects.map(p => (
    <option key={p} value={p}>
      {p}
    </option>
  ));

  useEffect(() => {
    getAllProjects();
  }, [getAllProjects]);

  useEffect(() => {
    changeToggle(false);
  }, []);

  const handleSelect = e => {
    if (e.target.value === "create-project") {
      changeToggle(true);
      return;
    } else if (e.target.value === "total") {
      console.log("removing project");
      changeSelected(e.target.value);

      removeProject();
    } else {
      changeSelected(e.target.value);
      getProject(e.target.value);
    }
  };

  const removeInput = () => {
    changeToggle(false);
  };

  const add = projectData => {
    addProject(projectData);
    removeInput();
    getAllProjects();
  };

  if (toggleAddProject) {
    return (
      <>
        <AddProject add={add} />
        <Overlay onClick={removeInput} />
      </>
    );
  }
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
  addProject: PropTypes.func.isRequired,

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

export default connect(mapStateToProps, {
  getAllProjects,
  addProject,
  getDailyChartForProject,
  getProject,
  removeProject
})(ProjectSelect);
