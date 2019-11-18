import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../redux/actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import "../../css/formStyle.css";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    let env = process.env.NODE_ENV;
    const userData = { email: "poshea48@msn.com", env };
    this.props.loginUser(userData);
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.errors) {
      return { errros: nextProps };
    }
    return null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }

    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row form-row">
            <div className="form-display">
              <h1 style={{ textAlign: "center", fontFamily: "monospace" }}>
                Welcome Back, Please Log in
              </h1>
              <div style={{ textAlign: "center", color: "red" }}>
                <p>This application is in Demo-mode</p>
                <p>Click submit to continue</p>
              </div>
              <form onSubmit={this.onSubmit} style={{ marginTop: "1em" }}>
                <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value="sample@email.com"
                  onChange={this.onChange}
                  label="Email Address"
                  error={errors.login}
                  disabled={true}
                />

                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value="doesntmatter"
                  onChange={this.onChange}
                  label="Password"
                  error={errors.login}
                  disabled={true}
                />
                <input
                  type="submit"
                  className="form-button"
                  style={{ marginRight: "1em" }}
                />
                <Link to="/">Cancel</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
