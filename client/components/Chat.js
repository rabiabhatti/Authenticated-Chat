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
    let message = document.getElementById('message').value
    this.state.socket.emit('new-message', message)
  }

  render() {
    let messages = this.state.messages.map((msg, index) => <p key={index} ><span>{msg}</span></p>)

    return(
      <Wrapper>
        <button onClick={() => this.props.logout()} className='logoutBtn'>Logout</button>
        <div className='messages'>{messages}</div>
        <div className='writeMsg'>
          <input className='chatInput' id="message" type="text" placeholder='Message...' />
          <button onClick={() => this.submitMessage()} className='sendBtn'>Send</button>
        </div>
      </Wrapper>
    )
  }
}

export default connect(null, { logout })(Chat)
