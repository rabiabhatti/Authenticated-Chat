import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Home from './components/Home'
import Profile from './components/Profile'
import Chat from './components/Chat'
import LoginPage from './components/login/LoginPage'
import SignUpPage from './components/signup/SignupPage'

function PrivateRoute ({component: Component, auth}) {
    return (
        <Route
            render={(props) => auth === true
                ? <Component {...props} />
                : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
        />
    )
}

const Router = ({ isLoggedIn }) => console.log('isLoggedIn', isLoggedIn) || (
    <BrowserRouter>
        <div>
            <Switch>
                <Route exact path='/' component={isLoggedIn ? Profile : Home} />
                <Route path="/signUp" component={SignUpPage} />
                <Route path="/login" component={LoginPage} />
                <PrivateRoute auth={isLoggedIn} path="/profile" component={Profile} />
                <PrivateRoute auth={isLoggedIn} path="/chat" component={Chat} />
            </Switch>
        </div>
    </BrowserRouter>
)

export default connect(({ user }) => console.log('user', user.user) || ({ isLoggedIn: !!user.user }))(Router)
