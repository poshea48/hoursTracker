import React from "react";
import ActionButton from "../styles/ActionButton";

const ResetButton = ({ reset, resetDisabled }) => {
  const handleResetClick = e => {
    localStorage.setItem("hoursToday", 0);
    localStorage.setItem("dateToday", "");
    reset();
  };
  return (
    <ActionButton onClick={handleResetClick} disabled={resetDisabled}>
      Reset
    </ActionButton>
  );
};

export default ResetButton;
