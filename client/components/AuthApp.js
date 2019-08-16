import React from 'react'
import { connect } from 'react-redux'
import AuthHeader from './AuthHeader'
import { sessionMiddleware } from '../actions/sessionMiddleware'

class AuthApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      errors: {}
    }
  }


  componentWillMount() {
    this.props.sessionMiddleware().then(
      (res) => {
        if(res.data.loggedIn) {
          this.setState({
             user: res.data.user,
            })
        }else if (res.data.errors) {
          res.data.errors.forEach(function(message) {
            alert(message)
          })
          this.context.router.history.push('/login')
        } else {
          this.context.router.history.push('/login')
        }
      })
  }

  render() {
    const { errors } = this.state
    return(
      <div>
        <AuthHeader />
        {this.props.children}
      </div>
    )
  }
}

AuthApp.propTypes = {
  sessionMiddleware: React.PropTypes.func.isRequired
}

AuthApp.contextTypes = {
  router: React.PropTypes.shape({
    history: React.PropTypes.object.isRequired,
  }),
}

export default connect(null, { sessionMiddleware })(AuthApp)
