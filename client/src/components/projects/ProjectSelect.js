import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import {
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

  let displayProjects = projects.map(p => {
    return (
      <option key={p.projectId} value={p.name} data-id={p.projectId}>
        {p.name}
      </option>
    );
  });

  const handleSelect = e => {
    if (e.target.value === "create-project") {
      changeToggle(true);
      return;
    } else if (e.target.value === "total") {
      console.log("removing project");
      changeSelected(e.target.value);

      removeProject();
    } else {
      const project = e.target.options[e.target.selectedIndex];
      changeSelected(e.target.value);
      getProject(project.dataset.id);
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
  addProject,
  getDailyChartForProject,
  getProject,
  removeProject
})(ProjectSelect);
