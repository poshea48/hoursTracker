import React from "react";
import styled from "styled-components";
import NavLink from "../NavLink";

const Container = styled.div`
  align-self: center;
  margin: 5px 1em;
  font-family: Monospace;
  font-size: 1.5em;
  @media (max-width: 520px) {
    display: flex;
  }

  @media (max-width: 385px) {
    display: flex;
    font-size: 0.5em;
  }
`;
const Brand = () => (
  <Container>
    <NavLink brand to="/dashboard">
      Hours Tracker
    </NavLink>
  </Container>
);

export default Brand;
