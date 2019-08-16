import React from 'react'

import Wrapper from '../Wrapper'
import SignUpForm from './SignupForm'

import '../../styles/unAuthApp.css'

export default () => (
    <Wrapper>
        <div className='auth-wrapper'>
            <h1 className='signUp-heading'>Sign Up</h1>
            <SignUpForm />
        </div>
    </Wrapper>
)
