import React from 'react'
import App from '../App'
import SignupForm from './SignupForm'
import { connect } from 'react-redux'
import { userSignupRequest } from '../../actions/signupActions'

class SignupPage extends React.Component {

  render() {
    const { userSignupRequest } = this.props

    return(
        <App>
          <SignupForm userSignupRequest={userSignupRequest} />
        </App>
    )
  }
}

SignupPage.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired
}

export default connect(null, { userSignupRequest })(SignupPage)
