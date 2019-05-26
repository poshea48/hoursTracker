import React from "react";
import NavLink from "./NavLink";
import LinksWrapper from "./LinksWrapper";

const GuestLinks = () => (
  <LinksWrapper>
    <NavLink to="/register">Sign Up</NavLink>
    <NavLink to="/login">Log In</NavLink>
  </LinksWrapper>
);

export default GuestLinks;
