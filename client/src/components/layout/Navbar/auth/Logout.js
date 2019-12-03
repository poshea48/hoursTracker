import React, { useState } from "react";
import styled from "styled-components";
import FlashMessage from "../../FlashMessage";

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

const Logout = () => {
  const [flashMessage, changeFlash] = useState("");

  const removeFlashMessage = () => {
    changeFlash("");
  };
  const handleLogout = () => {
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
  return (
    <>
      <Button onClick={handleLogout}>Log out</Button>
      {flashMessage && (
        <FlashMessage message={flashMessage} remove={removeFlashMessage} />
      )}
    </>
  );
};

export default Logout;
