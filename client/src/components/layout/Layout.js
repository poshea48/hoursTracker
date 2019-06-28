import React, { useState, memo } from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";
import styled from "styled-components";
import FlashMessage from "./FlashMessage";

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

const Layout = ({ auth, children }) => {
  const [flashMessage, changeFlash] = useState("");

  const onLogoutClick = () => {
    let message = "Logout has been disabled";
    changeFlash(message);
    return;
    // e && e.preventDefault();
    // const { hoursToday } = this.props.timer;
    // if (hoursToday > 0) {
    //   this.props.logHours(hoursToday);
    // }
    // ["hoursToday", "startTime", "dateToday"].forEach(i =>
    //   localStorage.removeItem(i)
    // );
    // console.log("should be logging out");
    // this.props.logoutUser();
  };
  const removeFlashMessage = () => {
    changeFlash("");
  };
  console.log("Layout");
  return (
    <Container>
      <Navbar onLogoutClick={onLogoutClick} auth={auth} />
      {flashMessage && (
        <FlashMessage message={flashMessage} remove={removeFlashMessage} />
      )}
      <Content>{children}</Content>
      <Footer />
    </Container>
  );
};

export default memo(Layout);
