import React, { useState } from "react";
import styled from "styled-components";
import Hamburger from "./Hamburger";
import ToggleScreen from "./ToggleScreen";

const Container = styled.div`
  align-self: center;
  margin: 5px 0.5em 5px 0.8em;

  display: none;
  @media (max-width: 520px) {
    display: flex;
    flex-direction: column;
  }
`;
const Toggle = ({ auth, onLogoutClick }) => {
  const [isToggleOn, setToggle] = useState(false);

  const toggleClick = () => {
    setToggle(!isToggleOn);
  };

  return (
    <Container>
      <Hamburger click={toggleClick} />

      {isToggleOn ? (
        <ToggleScreen auth={auth} onLogoutClick={onLogoutClick} />
      ) : null}
    </Container>
  );
};

export default Toggle;
