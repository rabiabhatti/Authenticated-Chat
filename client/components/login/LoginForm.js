import React from 'react'
import { connect } from 'react-redux'

import { login } from '../../actions/login'
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
      this.props.login(this.state).then(
        () => {
          this.context.router.history.push('/user/profile')
        },
        (err) => this.setState({ errors: err.response.data, isLoading: false })
      )
    }
  }

  render() {
    const { errors } = this.state

    return(
        <form className='login-form'>
          <input type="text" name="username" placeholder='Username' className='input' onChange={this.onChange.bind(this)} value={this.state.username} />
          {errors.username && <span className='error-msg'>{errors.username}</span>}
          <input type="password" name="password" placeholder='Password' className='input' onChange={this.onChange.bind(this)} value={this.state.password} />
          {errors.username && <span className='error-msg'>{errors.password}</span>}
          <button className='button-pink auth-btn' disabled={this.state.isLoading} onClick={this.onSubmit.bind(this)}>Login</button>
        </form>
    )
  }
}

LoginForm.propTypes = {
  login: React.PropTypes.func.isRequired
}

LoginForm.contextTypes = {
  router: React.PropTypes.shape({
    history: React.PropTypes.object.isRequired,
  }),
}

export default connect(null, { login })(LoginForm)
