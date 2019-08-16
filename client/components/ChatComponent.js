import React from 'react'
import AuthApp from './AuthApp'

export default class ChatComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      socket: window.io('/')
    }
  }

  componentDidMount() {
    let self = this
    this.state.socket.on('receive-message', function(msg) {
      let messages = self.state.messages
      messages.push(msg)
      self.setState({
        messages: messages
      })
    })
  }

  submitMessage() {
    let message = document.getElementById('message').value
    this.state.socket.emit('new-message', message)
  }

  render() {
    let i = 0
    let messages = this.state.messages.map(function(msg) {
      i++
      return(
        <li key={i} ><span>{msg}</span></li>
      )
    })

    return(
      <AuthApp>
        <ul>{messages}</ul>
        <input id="message" type="text" />
        <button onClick={() => this.submitMessage()}>Send</button>
      </AuthApp>
    )
  }
}
