import React, {Component} from 'react';
import {Button, Comment, Form, Header} from 'semantic-ui-react'

class Message extends Component {
  render() {
    return (
    <Comment>
      <Comment.Content>
        <Comment.Author as='a'>Matt</Comment.Author>
        <Comment.Metadata>
          <div>Today at 5:42PM</div>
        </Comment.Metadata>
        <Comment.Text>{this.props.msg}</Comment.Text>
      </Comment.Content>
    </Comment>)
  }
}

export default Message;
