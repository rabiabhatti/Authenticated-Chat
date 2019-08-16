import React from 'react'
import LoginForm from './LoginForm'
import App from '../App'

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
        <App>
          <h1>Login</h1>
          <LoginForm />
        </App>
    )
  }
}
