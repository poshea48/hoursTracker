import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import StartButton from "./StartButton";
import StopButton from "./StopButton";
import ResetButton from "./ResetButton";
import LogButton from "./LogButton";
import StartProjectButton from "./StartProjectButton";
import StopProjectButton from "./StopProjectButton";
import LogProjectButton from "./LogProjectButton";
import { Overlay, ModalDisplay } from "../../utils/useModal";
import ForceProjectLogDisplay from "../projects/ForceProjectLogDisplay";

import {
  startTimer,
  stopTimer,
  startProjectTimer,
  stopProjectTimer,
  resetTimer,
  logHours,
  logProjectHours,
  updateTimer
} from "../../redux/actions/timerActions";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const MainButtons = styled.div`
  display: flex;
  justify-content: space-evenly;
  @media only screen and (max-width: 450px) {
    flex-direction: column;
  }
`;

const ProjectButtons = styled.div`
  display: flex;
  justify-content: center;
`;

const ButtonNav = ({
  startTimer,
  stopTimer,
  startProjectTimer,
  stopProjectTimer,
  resetTimer,
  logHours,
  logProjectHours,
  timer,
  project
}) => {
  const { hoursToday, startTime, dateToday, project: projectTimer } = timer;
  const {
    start: startDisabled,
    stop: stopDisabled,
    reset: resetDisabled,
    log: logDisabled
  } = timer.disabled;

  const [forceProjectLog, toggleForceLog] = useState(false);

  const handleStartProjectClick = () => {
    if (projectTimer.id && project.id !== projectTimer.id) {
      toggleForceLog(true);
      return;
    }
    let projectStartTime = new Date().getTime();
    let startTotal = startTime === 0;
    localStorage.setItem("projectStartTime", startTime);
    localStorage.setItem("projectId", project.id);
    startProjectTimer(project.id, project.name, projectStartTime, startTotal);
  };

  const projectLogDisabled =
    project.id === projectTimer.id ? projectTimer.logDisabled : true;
  return (
    <Container>
      <MainButtons>
        <StartButton
          start={startTimer}
          dateToday={dateToday}
          startDisabled={startDisabled}
        />
        <StopButton
          stop={stopTimer}
          hoursToday={hoursToday}
          startTime={startTime}
          stopDisabled={stopDisabled}
          project={projectTimer}
        />
        <ResetButton reset={resetTimer} resetDisabled={resetDisabled} />
        <LogButton
          log={logHours}
          hoursToday={hoursToday}
          startTimer={startTime}
          dateToday={dateToday}
          logDisabled={logDisabled}
        />
      </MainButtons>
      {project.active && (
        <ProjectButtons>
          <StartProjectButton
            start={handleStartProjectClick}
            dateToday={dateToday}
            projectId={project.id}
            startDisabled={projectTimer.startDisabled}
            startTotal={startTime === 0}
            startedProject
          />
          <StopProjectButton
            stop={stopProjectTimer}
            id={projectTimer.id}
            hoursToday={projectTimer.hoursToday}
            startTime={projectTimer.startTime}
            stopDisabled={projectTimer.stopDisabled}
          />
          <LogProjectButton
            log={logProjectHours}
            id={projectTimer.id}
            hoursToday={projectTimer.hoursToday}
            startTime={projectTimer.startTime}
            logDisabled={projectLogDisabled}
          />
          {forceProjectLog && (
            <>
              <ModalDisplay>
                <ForceProjectLogDisplay
                  currentProject={projectTimer}
                  newProject={project}
                  cancel={() => toggleForceLog(false)}
                  log={logProjectHours}
                />
              </ModalDisplay>
              <Overlay onClick={() => toggleForceLog(false)} />
            </>
          )}
        </ProjectButtons>
      )}
    </Container>
  );
};

ButtonNav.propTypes = {
  startTimer: PropTypes.func.isRequired,
  startProjectTimer: PropTypes.func.isRequired,
  stopProjectTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  resetTimer: PropTypes.func.isRequired,
  logHours: PropTypes.func.isRequired,
  logProjectHours: PropTypes.func.isRequired,
  timer: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    timer: state.timer,
    errors: state.errors,
    project: state.project
  };
};

export default connect(mapStateToProps, {
  startTimer,
  stopTimer,
  startProjectTimer,
  stopProjectTimer,
  resetTimer,
  logHours,
  logProjectHours,
  updateTimer
})(ButtonNav);
