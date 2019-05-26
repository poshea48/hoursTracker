import React from "react";
import styled from "styled-components";

const Button = styled.button`
  cursor: pointer;
  border-radius: 5px;
  color: #fff;
  background: #343a40;
  text-transform: none;
  overflow: visible;
  font-size: 1em;
  margin: 0;
  line-height: 1.15;
  &:hover {
    color: #343a40;
    background-color: #fff;
  }
`;

const AuthButton = ({ children, click }) => (
  <Button onClick={click}>{children}</Button>
);

export default AuthButton;
