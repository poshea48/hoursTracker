import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 2em;
  text-align: center;
  margin-bottom: 50px;
  margin-top: 0;
  color: #343a40;

  @media (max-width: 450px) {
    margin-bottom: 25px;
  }
`;

const Today = new window.Date().toDateString();

const Header = () => (
  <Container>
    <Title>{Today}</Title>
  </Container>
);

export default Header;
