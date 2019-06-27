import React from "react";
import styled from "styled-components";

const Title = styled.h5`
  margin: 0;
`;
const User = ({ name }) => <Title>{name}</Title>;

export default User;
