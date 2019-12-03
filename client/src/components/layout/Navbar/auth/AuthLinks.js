import React from "react";
import LinksWrapper from "./LinksWrapper";
import styled from "styled-components";
import Logout from "./Logout";

const Li = styled.li``;

const AuthLinks = ({ click }) => {
  return (
    <LinksWrapper>
      <Li>
        <Logout />
      </Li>
    </LinksWrapper>
  );
};

export default AuthLinks;
