import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import  {logoutAction} from '../actions/logout'

class AuthHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: {}
    }
  }

  logout(e) {
    e.preventDefault()
    logoutAction(this.state)().then(
      () => {
        this.context.router.history.push('/')
      },
      (err) => this.setState({ errors: err.response.data })
    )
  }

  render() {

    return(
      <div>
        <ul className="header">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/chat">Start Chat</Link></li>
          <li><Link to="/" onClick={this.logout.bind(this)}>Logout</Link></li>
        </ul>
      </div>
    )
  }
}

AuthHeader.contextTypes = {
  router: React.PropTypes.shape({
    history: React.PropTypes.object.isRequired,
  }),
}

export default AuthHeader
