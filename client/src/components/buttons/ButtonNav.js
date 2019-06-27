import React from "react";
import styled from "styled-components";
import ActionButton from "./ActionButton";

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  @media only screen and (max-width: 450px) {
    flex-direction: column;
  }
`;

const ButtonNav = ({ actions }) => {
  const buttons = Object.keys(actions).map(button => (
    <ActionButton
      key={actions[button].id}
      disabled={actions[button].disabled}
      clicked={actions[button].action}
    >
      {button}
    </ActionButton>
  ));

  return <Container>{buttons}</Container>;
};

export default ButtonNav;
