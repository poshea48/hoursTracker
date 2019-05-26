import React from "react";
import styled from "styled-components";
import AuthLinks from "./AuthLinks";
import GuestLinks from "./GuestLinks";

const Container = styled.div`
  display: none;
  position: absolute;
  right: 0;
  top: 60px;
  width: 100%;
  background-color: #343a40;
  color: #fff;
  text-align: end;
  padding-right: 2em;
`;

const ToggleList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
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
