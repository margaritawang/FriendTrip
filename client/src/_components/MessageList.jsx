import React, { Component } from 'react';
import Message from './Message.jsx'
import {  Button,
          Comment,
          Form,
          Header} from 'semantic-ui-react';

export class MessageList extends Component {

  render() {
    const messages = this.props.messages
    console.log(messages);
    return (
      <Comment.Group>
        <Header as='h3' Messages>Messages</Header>
        <Message msg={messages[messages.length-1]}/>
      </Comment.Group>
    )
  }
}
