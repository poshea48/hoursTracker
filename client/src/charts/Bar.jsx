import React, { Component } from 'react'
import convertHoursToTime from '../utils/convertHoursToTime'

class Bar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovering: false
    }
  }

  handleMouseHover = () => {
    console.log('hovering')
    this.setState({ isHovering: !this.state.isHovering})
  }

  render () {
    const { height, scale, color } = this.props
    return (
      <div className="bar">
        { this.state.isHovering && (
          <div className="hover-hours">
            {convertHoursToTime(height)}
          </div>
        )}
        <div className="bar-content">
          {convertHoursToTime(height)}
        </div>
        <div
          className="hours"
          onMouseEnter={this.handleMouseHover}
          onMouseLeave={this.handleMouseHover}
          style={{height: `${height * scale}px`, background: `${color}`}}
        >
        </div>
      </div>
    )
  }

}

export default Bar;
