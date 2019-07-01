import React from "react";
import styled from "styled-components";

const Button = styled.button`
  cursor: pointer;
  /* background-color: #42f4c2; */
  background-color: #06db6d;
  /* background-color: #3befc9; */
  border: 1px solid black;
  width: 10em;
  padding: 0.6em;
  border-radius: 10px;
  transition: all 0.3s ease-in-out;
  margin: 0.2em 0;

  &:hover {
    transform: scale(1.1);
    opacity: 2;
    font: 2em;
  }

  &:disabled {
    background: #e7040f;
    border: 1px solid #e7040f;
    opacity: 0.6;
    transition: none;
    transform: none;
    cursor: default;
  }

  @media (max-width: 670px) {
    width: 8em;
  }

  @media (max-width: 575px) {
    width: 7.5em;
  }

  @media (max-width: 530px) {
    font-size: 90%;
  }

  @media (max-width: 450px) {
    align-self: center;
    font-size: 100%;
    width: 10em;
  }
`;

const ActionButton = ({ clicked, disabled, children }) => (
  <Button onClick={clicked} disabled={disabled}>
    {children}
  </Button>
);

export default ActionButton;
