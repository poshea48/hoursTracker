import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

class TextFieldGroup extends Component {
  render () {
    const { name, placeholder, value, label, error, info, type, onChange, disabled} = this.props
    return (
      <div className="form-group">
        <input
          type={type}
          className={classnames("form-control", {
            'is-invalid': error
          })}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      {error && <div className="invalid-feedback">{error}</div>}

      </div>
    )
  }
}

export default TextFieldGroup;
