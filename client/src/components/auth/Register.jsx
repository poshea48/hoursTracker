import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../redux/actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password_digest: "",
    password2: "",
    errors: {}
  };
  // this.onChange = this.onChange.bind(this);

  onChange = e => {
    return this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newUser = { ...this.state };
    this.props.registerUser(newUser, this.props.history); // this.props.history may not be need
  };

  // part 1/2 of replacement for deprecated componentWillReceiveProps
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.errors) {
  //     return { errors: nextProps.errors };
  //   }
  //   return null
  // }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  // componentWillUnmount() {
  //   if (Object.keys(this.props.errors).length > 0) {
  //     this.props.clearErrors()
  //   }
  // }

  // part 2/2 of replacement for deprecated componentWillReceiveProps
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }

    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    // disallow new registrations
    this.props.history.push("/dashboard");
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="form-display">
              <h1 className="display-4 text-center">Register</h1>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <TextFieldGroup
                  type="password"
                  placeholder="Password"
                  name="password_digest"
                  value={this.state.password_digest}
                  onChange={this.onChange}
                  error={errors.password_digest}
                />

                <TextFieldGroup
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />
                <input type="submit" className="form-button" value="Submit" />
                <Link to="/">Cancel</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors
  };
};
export default connect(mapStateToProps, { registerUser })(Register);
