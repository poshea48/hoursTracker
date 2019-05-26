import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const Line = styled.div`
  align-self: center;
  border-bottom: 4px solid #fff;
  width: 100%;
`;
const Hamburger = ({ click }) => (
  <Container onClick={click}>
    <Line />
    <Line />
    <Line />
  </Container>
);

export default Hamburger;
