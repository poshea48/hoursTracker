import React from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
`;

const Content = styled.div`
  padding: 1em;
  flex: 1 auto;
`;
const Layout = ({}) => (
  <Container>
    <Navbar />
    <Content>{children}</Content>
    <Footer />
  </Container>
);

export default Layout;
