import React, {Component} from 'react';
import Message from './Message.jsx'
import {Button, Comment, Form, Header} from 'semantic-ui-react';

export class MessageList extends Component {
  render() {
    const messages = this.props.messages
    const renderMessages = messages.map((message) => {
      return (<div className='chat-msg'><Message msg={message}/> </div>)
    })
    return (<Comment.Group>

      {renderMessages}
    </Comment.Group>)
  }
}
