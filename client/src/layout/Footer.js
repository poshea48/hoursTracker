import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 50px;
  background-color: #343a40;
  text-align: center;
`;

const Title = styled.h4`
  font-size: 1.5em;
  font-family: monospace;
  color: #fff;
  align-self: center;
  font-weight: 600;
  margin: 0 10px;
`;

const FooterItem = styled.div`
  color: #fff;
  align-self: center;
`;
const Footer = () => {
  return (
    <Container>
      <Title>O'Shea Inc</Title>
      <FooterItem>2019</FooterItem>
    </Container>
  );
};

export default Footer;
