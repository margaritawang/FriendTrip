import React, { Component } from 'react';
import Message from './Message.jsx'
import {  Button,
          Comment,
          Form,
          Header} from 'semantic-ui-react';
//key={i}> {object.city}
export class MessageList extends Component {
  render() {
    const messages = this.props.messages
    const renderMessages = messages.map((message) => {
      return (
        <Message msg={message} />
      )
    })
    return (
      <Comment.Group>
        <Header as='h3' Messages>messages</Header>
        {renderMessages}
      </Comment.Group>
    )
  }
}
