import React from 'react'

import Wrapper from '../Wrapper'
import LoginForm from './LoginForm'

import '../../styles/unAuthApp.css'

export default () => (
    <Wrapper>
        <div className='auth-wrapper'>
            <h1 className='login-heading'>Login</h1>
            <LoginForm />
        </div>
    </Wrapper>
)
