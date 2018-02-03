import React from 'react';
import { Button, Comment, Form, Header } from 'semantic-ui-react';

export class CommentComponent extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <Comment>
        <Comment.Avatar src='https://react.semantic-ui.com/assets/images/avatar/small/matt.jpg' />
        <Comment.Content>
          <Comment.Author as='a'>Matt</Comment.Author>
          <Comment.Metadata>
            <div>Today at 5:42PM</div>
          </Comment.Metadata>
          <Comment.Text>How artistic!</Comment.Text>
        </Comment.Content>
      </Comment>
    )
  }
}
