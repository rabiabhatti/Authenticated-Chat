import React from 'react'

import Wrapper from '../Wrapper'
import LoginForm from './LoginForm'

import '../../styles/unAuthApp.css'

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
        <Wrapper>
            <div className='login-wrapper'>
                <h1 className='login-heading'>Login</h1>
                <LoginForm />
            </div>
        </Wrapper>
    )
  }
}
