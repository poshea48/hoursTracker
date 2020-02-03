import React from "react";
import { ProjectButton } from "../styles/ActionButton";

const StartProjectButton = ({ start, startDisabled }) => {
  return (
    <ProjectButton onClick={start} disabled={startDisabled}>
      Start Project
    </ProjectButton>
  );
};

export default StartProjectButton;
