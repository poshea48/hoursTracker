import React, { Component } from 'react'
import { logoutUser } from '../redux/actions/authActions';
// import getTodaysDate from '../common/getTodaysDate';

class Navbar extends Component {
  render () {
    const { onLogoutClick, auth } = this.props
    const authLinks = auth.isAuthenticated ? (
      <div className="nav-item auth">
        <ul>
          <li>
            <button
              className="auth-button"
              onClick={onLogoutClick}>
              Log Out
            </button>
          </li>
        </ul>
      </div>
    ) : (
      <div className="nav-item auth">
        <ul>
          <li>Log In</li>
          <li>Register</li>
        </ul>
      </div>
    )
    return (
      <div className="navbar">
        <div className="nav-item">
          <h5 style={{margin: 0}}>{auth.user.name}</h5>
        </div>
        {authLinks}
      </div>

    )
  }
}

export default Navbar;
