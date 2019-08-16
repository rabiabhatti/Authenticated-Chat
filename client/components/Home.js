import React from 'react'
import { Link } from 'react-router-dom'

import Wrapper from './Wrapper'

import '../styles/unAuthApp.css'

export default () => (
    <Wrapper>
        <div className='homeWrapper'>
            <button className='button-pink'><Link to="/login">Login</Link></button>
            <button className='button-purple'><Link to="/signUp">Sign up</Link></button>
        </div>
    </Wrapper>
)
