import React from "react";
import styled from "styled-components";

const Container = styled.div`
  align-self: center;
  margin: 5px 1em;
`;

const List = styled.ul`
  display: flex;
  margin-left: auto;
  list-style: none;
  margin: 10px 2px;
  padding: 0;

  @media (max-width: 575px) {
    flex-direction: column;
  }
`;

const LinksWrapper = ({ children }) => <List>{children}</List>;

export default LinksWrapper;
