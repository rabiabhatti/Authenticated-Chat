import React from 'react'
import AuthApp from './AuthApp'

export default class Profile extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
        <AuthApp>
          <h1>I am Profile.</h1>
        </AuthApp>
    )
  }
}
