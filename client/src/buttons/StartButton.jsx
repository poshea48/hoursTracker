import React, { Component } from 'react';

class StartButton extends Component {
  render() {
    const { disabled, startTimer } = this.props
    return (
      <button
        className='start button'
        onClick={startTimer}
        disabled={disabled}
        >
        Start
      </button>
    )
  }
}

export default StartButton;
