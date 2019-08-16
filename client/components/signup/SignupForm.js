import React from 'react'
import App from '../App'
import { BrowserRouter as Router } from 'react-router-dom'
import validateInput from '../../../server/shared/validations/signup'

class SignupForm extends React.Component {
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
      this.props.userSignupRequest(this.state).then(
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
        <div>
          <h1>Welcome!</h1>
          <form onSubmit={this.onSubmit.bind(this)}>
            <lable>Username</lable>
            <input type="text" name="username" onChange={this.onChange.bind(this)} value={this.state.username} />
            <br />
            {errors.username && <span>{errors.username}</span>}
            <br />
            <lable>Email</lable>
            <input type="email" name="email" onChange={this.onChange.bind(this)} value={this.state.email} />
            <br />
            {errors.email && <span>{errors.email}</span>}
            <br />
            <lable>Password</lable>
            <input type="password" name="password" onChange={this.onChange.bind(this)} value={this.state.password} />
            <br />
            {errors.password && <span>{errors.password}</span>}
            <br />
            <button disabled={this.state.isLoading}>Signup</button>
          </form>
        </div>
    )
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired
}

SignupForm.contextTypes = {
  router: React.PropTypes.shape({
    history: React.PropTypes.object.isRequired,
  }),
}

export default SignupForm
