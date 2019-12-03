import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import StartButton from "./StartButton";
import StopButton from "./StopButton";
import ResetButton from "./ResetButton";
import LogButton from "./LogButton";

import {
  startTimer,
  stopTimer,
  resetTimer,
  logHours,
  updateTimer
} from "../../redux/actions/timerActions";

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  @media only screen and (max-width: 450px) {
    flex-direction: column;
  }
`;

const ButtonNav = ({
  startTimer,
  stopTimer,
  resetTimer,
  logHours,
  timer,
  project
}) => {
  const { hoursToday, startTime, dateToday } = timer;
  const {
    start: startDisabled,
    stop: stopDisabled,
    reset: resetDisabled,
    log: logDisabled
  } = timer.disabled;
  return (
    <Container>
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
      />
      <ResetButton reset={resetTimer} resetDisabled={resetDisabled} />
      <LogButton
        log={logHours}
        hoursToday={hoursToday}
        startTimer={startTime}
        dateToday={dateToday}
        logDisabled={logDisabled}
      />
    </Container>
  );
};

ButtonNav.propTypes = {
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  resetTimer: PropTypes.func.isRequired,
  logHours: PropTypes.func.isRequired,
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
  resetTimer,
  logHours,
  updateTimer
})(ButtonNav);
