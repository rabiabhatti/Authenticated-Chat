import React from 'react'
import App from './App'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
        <App>
          <h1>I am Home.</h1>
        </App>
    )
  }
}
