import React, { Component } from 'react'
import getTodaysDate from '../utils/getTodaysDate';

class Header extends Component {
  render () {
    return (
      <div className="header">
        <h1 className='f1 tc heading mt3 mb2'>Hours Worked Tracker</h1>
        <h3 className='f3 tc heading mt0 mb3'>{getTodaysDate()}</h3>
      </div>

    )
  }
}

export default Header;
