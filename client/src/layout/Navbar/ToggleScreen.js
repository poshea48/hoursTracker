import React from "react";
import styled, { css, keyframes } from "styled-components";
import AuthLinks from "./AuthLinks";
import GuestLinks from "./GuestLinks";

const animationBackdrop = keyframes`
  0% {
    height: 0;

  }

  100% {
    height: 100%;
  }
`;

const animationItems = keyframes`
  0% {
    height: 100%;
    opacity: 0;
  }
  100% {
    height: 100%;
    opacity: 1;
  }
`;

const animationBackdropRule = css`
  ${animationBackdrop} .5s ease-in-out;
`;

const animationItemsRule = css`
  ${animationItems} .5s ease-in-out;
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
  animation: ${animationBackdropRule};
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
        <h4 style={{ margin: 0 }}>{auth.user.name}</h4>
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
