import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background: white;
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  max-width: 200px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

const Button = styled.div`
  width: 70px;
  cursor: pointer;
  background: black;
  text-align: center;
  padding: 0.3em 0.5em;
  border-radius: 10px;
  color: white;
`;

const ForceProjectLogDisplay = ({
  currentProject,
  newProject,
  cancel,
  log
}) => {
  return (
    <Container>
      <h4>Would you like to Log {currentProject.name} before continuing?</h4>
      <ButtonsWrapper>
        <Button onClick={() => log(currentProject)}>Log</Button>
        <Button onClick={() => cancel()}>cancel</Button>
      </ButtonsWrapper>
    </Container>
  );
};

export default ForceProjectLogDisplay;
