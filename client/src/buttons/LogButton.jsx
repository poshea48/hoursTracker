import React, { Component } from 'react';

class LogButton extends Component {
  render() {
    const { disabled, logHours } = this.props
    return (
      <button
        className='log button'
        onClick={logHours}
        disabled={disabled}
      >
        Log Hours
      </button>
    )
  }

}

export default LogButton
