import React, { Component } from 'react';

class ResetButton extends Component {
  render() {
    const {disabled, resetTimer} = this.props
    return (
      <button
        className='reset button'
        onClick={resetTimer}
        disabled={disabled}
      >
        Reset
      </button>
    )
  }
}

export default ResetButton;
