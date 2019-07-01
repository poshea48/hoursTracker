import React, { Component } from "react";
import convertHoursToTime from "../../utils/convertHoursToTime";

class Bar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovering: false
    };
  }

  handleMouseHover = () => {
    this.setState({ isHovering: !this.state.isHovering });
  };

  handleBarClick = e => {
    const barContent = e.target.previousSibling;
    const isMobile = window.innerWidth < 480;

    if (isMobile) {
      barContent.style.display = "block";
      setTimeout(() => (barContent.style.display = "none"), 2000);
    }
  };

  render() {
    const { height, scale, color } = this.props;
    return (
      <div className="bar">
        <div className="bar-content">{convertHoursToTime(height)}</div>
        <div className="hover-hours">{convertHoursToTime(height)}</div>
        <div
          className="hours"
          onClick={this.handleBarClick}
          style={{ height: `${height * scale}px`, background: `${color}` }}
        />
      </div>
    );
  }
}

export default Bar;
