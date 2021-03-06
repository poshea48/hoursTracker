import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  position: fixed;
  top: 50px;
  left: 0;
  justify-content: center;
  width: 100%;
  background-color: red;
  color: white;
  z-index: 50;
`;

const Delete = styled.div`
  position: absolute;
  top: 3px;
  right: 15px;
  cursor: pointer;
  color: black;
`;
const FlashMessage = ({ message, remove }) => {
  return (
    <Container>
      <p>!!!{message}!!!!</p>
      <Delete onClick={remove}>x</Delete>
    </Container>
  );
};

export default FlashMessage;
