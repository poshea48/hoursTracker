import React from "react";
import "../../css/Spinner.css";

const Spinner = () => {
  return (
    <div className="spinner">
      <div className="lds-roller">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default Spinner;
