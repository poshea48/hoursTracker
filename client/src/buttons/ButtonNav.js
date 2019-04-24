import React, { PureComponent } from "react";
import styled from "styled-components";
import StartButton from "./StartButton";
import StopButton from "./StopButton";
import ResetButton from "./ResetButton";
import LogButton from "./LogButton";

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  @media only screen and (max-width: 670px) {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
  }
`;
class ButtonNav extends PureComponent {
  render() {
    const {
      startDisabled,
      stopDisabled,
      resetDisabled,
      logDisabled,
      startTimer,
      stopTimer,
      resetTimer,
      logHours
    } = this.props;
    return (
      <Container>
        <StartButton disabled={startDisabled} startTimer={startTimer} />
        <StopButton disabled={stopDisabled} stopTimer={stopTimer} />
        <ResetButton disabled={resetDisabled} resetTimer={resetTimer} />
        <LogButton disabled={logDisabled} logHours={logHours} />
      </Container>
    );
  }
}

export default ButtonNav;
