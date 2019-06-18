import React, { useState } from "react";
import styled from "styled-components";
import User from "./userItem/User";
import Brand from "./brand/Brand";
import AuthLinks from "./auth/AuthLinks";
import GuestLinks from "./auth/GuestLinks";
import Toggle from "./toggleScreen/Toggle";

const Container = styled.div`
  display: flex;
  position: relative;
  height: 60px;
  background-color: #343a40;
  color: #fff;
  justify-content: space-between;
  z-index: 10;
`;
const ResponsiveLink = styled.div`
  align-self: center;
  margin: 5px 1em;

  @media (max-width: 520px) {
    display: none;
  }
`;

const Navbar = props => {
  const { onLogoutClick, auth } = props;

  return (
    <Container>
      <ResponsiveLink>
        <User name={auth.user.name} />
      </ResponsiveLink>

      <Brand />
      <ResponsiveLink>
        {auth.isAuthenticated ? (
          <AuthLinks click={onLogoutClick} />
        ) : (
          <GuestLinks />
        )}
      </ResponsiveLink>

      <Toggle auth={auth} onLogoutClick={onLogoutClick} />
    </Container>
  );
};

export default Navbar;
