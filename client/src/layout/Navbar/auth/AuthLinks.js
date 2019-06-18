import React from "react";
import LinksWrapper from "./LinksWrapper";
import styled from "styled-components";
import AuthButton from "./AuthButton";

const Li = styled.li``;

const AuthLinks = ({ click }) => (
  <LinksWrapper>
    <Li>
      <AuthButton click={click}>Log out</AuthButton>
    </Li>
  </LinksWrapper>
);

export default AuthLinks;
