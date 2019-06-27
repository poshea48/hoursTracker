import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  align-self: center;
  margin: 5px 1em;

  display: none;
  @media (max-width: 520px) {
    display: flex;
    margin: 5px 0;
    flex-direction: column;
  }
`;
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
  <Wrapper>
    <Container onClick={click}>
      <Line />
      <Line />
      <Line />
    </Container>
  </Wrapper>
);

export default Hamburger;
