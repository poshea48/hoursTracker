import React, { PureComponent } from "react";
import styled from "styled-components";
import ActionButton from "./ActionButton";

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

const ButtonNav = ({ actions }) => {
  const buttons = Object.keys(actions).map(button => (
    <ActionButton
      disabled={actions[button].disabled}
      clicked={actions[button].action}
    >
      {button}
    </ActionButton>
  ));

  return <Container>{buttons}</Container>;
};

export default ButtonNav;
