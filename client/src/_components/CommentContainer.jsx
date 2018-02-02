import React from 'react';
import { Button, Comment, Form, Header } from 'semantic-ui-react';
import { CommentComponent } from './CommentComponent';

export class CommentContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Comment.Group size='small'>
        <Header>Comments</Header>
        <CommentComponent/>
        <CommentComponent/>
        <CommentComponent/>
        <CommentComponent/>
        <CommentComponent/>
      <Form reply size='mini'>
        <Form.TextArea style={{height: '50px'}}/>
        <Button content='Add Reply' labelPosition='left' icon='edit' primary />
      </Form>
    </Comment.Group>
    )
  }
}
