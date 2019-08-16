import React from 'react'
import { connect } from 'react-redux'

import {userSignUpRequest} from "../../actions/signupActions"
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
      this.props.userSignUpRequest(this.state).then(
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
          <form className='auth-form'>
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

SignUpForm.propTypes = {
  userSignUpRequest: React.PropTypes.func.isRequired
}

SignUpForm.contextTypes = {
  router: React.PropTypes.shape({
    history: React.PropTypes.object.isRequired,
  }),
}

export default connect(null, { userSignUpRequest })(SignUpForm)
