import React from 'react'
import {connect} from "react-redux";

import Wrapper from './Wrapper'
import {logout} from "../actions/auth";

import '../styles/chat.css'

class Chat extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      socket: window.io('/')
    }
  }

  componentDidMount() {
    this.state.socket.on('receive-message', (msg) => this.updateMessages(msg))
  }

  updateMessages(msg) {
    this.setState(prevState => ({
      messages: [...prevState.messages, msg]
    }))
  }

  submitMessage() {
    const msg = this.props.user + ':' + document.getElementById('message').value
    this.state.socket.emit('new-message', msg)
  }

  render() {
    let messages = this.state.messages.reverse().map((msg, index) => {
      const fullMsg = msg.split(':')
      return (
          <li key={index} className={`${this.props.user === fullMsg[0] ? 'sent' : 'received'} msgWrapper`} >
            <span className='user'>{fullMsg[0]}</span>
            <span className='msg'>{fullMsg[1]}</span>
          </li>
      )
    })

    return(
      <Wrapper>
        <button onClick={() => this.props.logout()} className='logoutBtn'>Logout</button>
        <ul className='messages'>{messages}</ul>
        <div className='writeMsg'>
          <input className='chatInput' id="message" type="text" placeholder='Message...' />
          <button onClick={() => this.submitMessage()} className='sendBtn'>Send</button>
        </div>
      </Wrapper>
    )
  }
}

function mapStateToProps({ user }) {
  return { user: user.user };
}

export default connect(mapStateToProps, { logout })(Chat)
