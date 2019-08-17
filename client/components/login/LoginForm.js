import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { login } from '../../actions/auth'
import validateInput from '../../../server/shared/validations/login'

import '../../styles/unAuthApp.css'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
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

  onSubmit() {
    if(this.isValid()) {
      this.setState({ errors: {}, isLoading: true })
      this.props.login(this.state)
    }
  }

  render() {
    const { errors } = this.state

    return(
        <form className='auth-form'>
          {this.props.error && <span className='error-msg'>{this.props.error}</span>}
          <input type="text" name="username" placeholder='Username' className='input' onChange={this.onChange.bind(this)} value={this.state.username} />
          {errors.username && <span className='error-msg'>{errors.username}</span>}
          <input type="password" name="password" placeholder='Password' className='input' onChange={this.onChange.bind(this)} value={this.state.password} />
          {errors.username && <span className='error-msg'>{errors.password}</span>}
          <button className='button-pink auth-btn' disabled={this.state.isLoading} onClick={this.onSubmit.bind(this)}>Login</button>
        </form>
    )
  }
}

LoginForm.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.object.isRequired,
  }),
}

function mapStateToProps({ user }) {
  return { user: user.user, error: user.error };
}

export default connect(mapStateToProps, { login })(LoginForm)
