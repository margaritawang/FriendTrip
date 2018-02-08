import React from 'react';
import { Button, Comment, Form, Header } from 'semantic-ui-react';

export class CommentComponent extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    const comment = this.props.comment;
    console.log('cc coment', comment)
    return(
      <Comment>
        <Comment.Avatar src='https://react.semantic-ui.com/assets/images/avatar/small/matt.jpg' />
        <Comment.Content>
          <Comment.Author>{comment.first_name}</Comment.Author>
          <Comment.Text>{comment.description}</Comment.Text>
        </Comment.Content>
      </Comment>
    )
  }
}
