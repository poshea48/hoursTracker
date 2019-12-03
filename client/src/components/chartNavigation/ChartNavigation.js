import React from "react";
import styled from "styled-components";
import ChartTypeSelect from "./ChartTypeSelect";
import ProjectSelect from "../projects/ProjectSelect";

const Nav = styled.div`
  display: flex;
  margin: 50px auto 0 auto;
  justify-content: space-between;
  width: 100%;
  max-width: 600px;
  align-self: center;
  border-radius: 10px;
  padding: 0.4em;
  @media (max-width: 450px) {
    margin-top: 10px;
  }
`;
const Title = styled.h2`
  font-family: monospace;
  margin: 0 0 0 5%;
  font-weight: 700;
  font-size: 32px;
  @media (max-width: 400px) {
    font-size: 28px;
  }
`;
const SelectItems = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const ChartNavigation = ({ project }) => {
  const header =
    project === "total" ? "Total Hours" : project.replace(/[-_]/, " ");
  return (
    <Nav>
      <Title>{header}</Title>
      <SelectItems>
        <ChartTypeSelect />
        <ProjectSelect />
      </SelectItems>
    </Nav>
  );
};

export default ChartNavigation;
