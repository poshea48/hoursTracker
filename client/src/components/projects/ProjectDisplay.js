import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;
const ProjectDisplay = ({ projectName, projectHours }) => {
  return (
    <Container>
      <span>
        {projectName} Total hours: {projectHours}
      </span>
    </Container>
  );
};

export default ProjectDisplay;
