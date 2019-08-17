import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react"
import Router from './router'

import { store, persistor } from './redux'

import './styles/general.css'

render(
  <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router />
      </PersistGate>
  </Provider>, document.getElementById('app')
 )
