import React, { Component } from 'react';

class StopButton extends Component {
  render() {
    const { disabled, stopTimer} = this.props
    return (
      <button
        className='stop button'
        onClick={stopTimer}
        disabled={disabled}
        >
        Stop
      </button>
    )
  }
}


export default StopButton;
