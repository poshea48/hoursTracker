import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginUser } from '../redux/actions/authActions'
import TextFieldGroup from '../common/TextFieldGroup'
import '../css/formStyle.css'

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit = e => {
    e.preventDefault();
    const userData = {...this.state}
    this.props.loginUser(userData)
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.errors) {
      return { errros: nextProps }
    }
    return null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors })
    }

    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')

    }
  }

  render () {
    const { errors } = this.state
    return (
      <div className="login">
        <div className="container">
          <div className="row form-row">
            <div className="form-display">
              <h1>Log in</h1>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  label="Email Address"
                  error={errors.login}
                />

                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  label="Password"
                  error={errors.login}
                />
              <input type="submit" className="form-button" />
              <Link to="/" >Cancel</Link> 
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login);
