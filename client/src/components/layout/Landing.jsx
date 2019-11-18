import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row main-title">
              <h1 className="row-item">Welcome to</h1>
              <h1 className="row-item">Hours Tracker</h1>
            </div>
            <div style={{ textAlign: "center", color: "red" }}>
              <p>This application is currently in Demo-mode</p>
              <p>Click Login to continue</p>
            </div>
            <div className="row">
              <hr />
            </div>
            <div className="row landing-links row-item">
              <Link to="/register" className="button mr-2">
                Sign Up
              </Link>
              <Link to="/login" className="button">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Landing);
