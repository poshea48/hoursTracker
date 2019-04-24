import React, { Component } from "react";

class LogButton extends Component {
  render() {
    console.log("rendering LogButton");
    const { disabled, logHours } = this.props;
    return (
      <button className="log button" onClick={logHours} disabled={disabled}>
        Log Hours
      </button>
    );
  }
}

export default LogButton;
