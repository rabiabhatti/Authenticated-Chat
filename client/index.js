import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import Home from './components/Home'
import Profile from './components/Profile'
import ChatComponent from './components/ChatComponent'
import LoginPage from './components/login/LoginPage'
import SignupPage from './components/signup/SignupPage'

import './styles/general.css'

const store = createStore(
  (state= {}) => state,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/user/profile" component={Profile} />
        <Route path="/chat" component={ChatComponent} />
      </div>
    </Router>
  </Provider>, document.getElementById('app')
 )
