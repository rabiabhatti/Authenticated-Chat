import React from 'react'
import {connect} from "react-redux";
import {Link} from "react-router-dom"

import Wrapper from './Wrapper'
import {logout} from "../actions/auth";

class Profile extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
        <Wrapper>
          <h1>I am Profile.</h1>
            <button onClick={() => this.props.logout()}>Logout</button>
            <Link to="/chat">Start Chat</Link>
        </Wrapper>
    )
  }
}

export default connect(null, { logout })(Profile)