import React from "react";
import styled, { css, keyframes } from "styled-components";
import User from "../userItem/User";
import AuthLinks from "../auth/AuthLinks";
import GuestLinks from "../auth/GuestLinks";

const fadeinBackdrop = keyframes`
  0% {
    visibility: hidden;
    top: 0;
    z-index: -1;
  }

  100% {
    visibility: visible;
    top: 60px;
    z-index: -1;
  }
`;

const animationItems = keyframes`
  0% {
    opacity: 0;
  }
  80% {
    opacity: 0
  }
  100% {
    opacity: 1;
  }
`;

const fadeinRule = css`
  ${fadeinBackdrop} .3s ease-in-out;
`;

const animationItemsRule = css`
  ${animationItems} .3s ease-in-out;
`;

const Container = styled.div`
  position: absolute;
  right: 0;
  top: 60px;
  width: 100%;
  background-color: #343a40;
  color: #fff;
  text-align: end;
  padding-right: 1em;
  animation: ${fadeinRule};
`;

const ToggleList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  animation: ${animationItemsRule};
`;

const ToggleItem = styled.div`
  margin: 5px 0;
`;
const ToggleScreen = ({ auth, onLogoutClick }) => (
  <Container id="toggleList">
    <ToggleList>
      <ToggleItem>
        <User style={{ display: "block" }} name={auth.user.name} />
      </ToggleItem>
      <ToggleItem>
        {auth.isAuthenticated ? (
          <AuthLinks click={onLogoutClick} />
        ) : (
          <GuestLinks />
        )}
      </ToggleItem>
    </ToggleList>
  </Container>
);

export default ToggleScreen;
