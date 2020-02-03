import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.form`
  display: flex;
  justify-content: space-between;
  z-index: 10;
  padding: 0.4em 0;
  border: none !important;
  font-size: 14px;
  font-family: sans-serif;
  font-weight: 700;
  border: 1px solid black;
  box-sizing: border-box;
  background: inherit;
  margin: 0 0 0 0.4em;
  border-radius: 0.5em;
  &:focus {
    outline: none;
  }

  &:last-child {
    margin-left: 0.6em;
  }

  option {
    font-weight: normal;
  }

  @media (max-width: 550px) {
    border: none !important;
    &:last-child {
      margin-left: 0;
    }
  }

  input {
    width: 80%;
    z-index: 10;
    padding-left: 0.2em;
  }

  .add {
    font-size: 1.5em;
    margin-left: 0.2em;
    background: black;
    color: white;
    cursor: pointer;
  }
`;
const AddProject = ({ add }) => {
  const [project, changeProject] = useState("");

  const handleChange = e => {
    changeProject(e.target.value);
  };

  const submitChange = e => {
    e.preventDefault();
    if (project.match(/[^a-zA-Z0-9'-]+/g)) {
      changeProject("Invalid Characters");
      return;
    }

    const projectData = { projectName: project };
    add(projectData);
  };

  return (
    <Container onSubmit={submitChange}>
      <input
        onChange={handleChange}
        placeholder="Project"
        name="projectName"
        value={project}
        required
      />
      <button type="submit" className="add">
        +
      </button>
    </Container>
  );
};

export default AddProject;
