import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { signUp } from '../../actions/auth'
import validateInput from '../../../server/shared/validations/signup'

import '../../styles/unAuthApp.css'

class SignUpForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      errors: {},
      isLoading: false
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      this.context.router.history.push('/chat')
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state)

    if(!isValid) {
      this.setState({ errors })
    }
    return isValid
  }

  onSubmit(e) {
    e.preventDefault()

    if(this.isValid()) {
      this.setState({ errors: {}, isLoading: true })
      this.props.signUp(this.state)
    }
  }

  render() {
    const { errors } = this.state
    return(
          <form className='auth-form'>
            {this.props.error && <span className='error-msg'>{this.props.error}</span>}
            <input type="text" name="username" className='input' placeholder='Username' onChange={this.onChange.bind(this)} value={this.state.username} />
            {errors.username && <span className='error-msg'>{errors.username}</span>}
            <input type="email" name="email" className='input' placeholder='Email' onChange={this.onChange.bind(this)} value={this.state.email} />
            {errors.email && <span className='error-msg'>{errors.email}</span>}
            <input type="password" name="password" className='input' placeholder='Password' onChange={this.onChange.bind(this)} value={this.state.password} />
            {errors.password && <span className='error-msg'>{errors.password}</span>}
            <button disabled={this.state.isLoading} onClick={this.onSubmit.bind(this)} className='button-purple auth-btn'>Sign Up</button>
          </form>
    )
  }
}

SignUpForm.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.object.isRequired,
  }),
}

function mapStateToProps({ user }) {
  return { user: user.user, error: user.error };
}

export default connect(mapStateToProps, { signUp })(SignUpForm)
