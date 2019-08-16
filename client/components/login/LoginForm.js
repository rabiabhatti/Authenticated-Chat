import React from 'react'
import validateInput from '../../../server/shared/validations/login'
import { connect } from 'react-redux'
import { login } from '../../actions/login'


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
        <div>
          <form onSubmit={this.onSubmit.bind(this)}>
            { errors.form && <div>{errors.form}</div> }
            <lable>Username</lable>
            <input type="text" name="username" onChange={this.onChange.bind(this)} value={this.state.username} />
            <br />
            {errors.username && <span>{errors.username}</span>}
            <br />
            <lable>Password</lable>
            <input type="password" name="password" onChange={this.onChange.bind(this)} value={this.state.password} />
            <br />
            {errors.username && <span>{errors.username}</span>}
            <br />
            <button disabled={this.state.isLoading}>Login</button>
          </form>
        </div>
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
