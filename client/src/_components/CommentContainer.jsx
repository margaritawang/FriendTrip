import React from 'react';
import {Button, Comment, Form, Header} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {CommentComponent} from './CommentComponent';
import {userActions} from '../_actions/user.actions.js';

class CommentContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e, {name, value}) {
    this.setState({[name]: value})
  }
  handleSubmit(e) {
    e.preventDefault();
    const activityId = this.props.activityId;
    const {dispatch, user} = this.props;
    const {post} = this.state;
    dispatch(userActions.createNewComment(user, activityId, post));
    this.setState({post: ''})
  }
  render() {
    const {comments} = this.props;
    const activityId = this.props.activityId;
    const {post} = this.state;
    return (<Comment.Group size='small'>
      <Header>Comments</Header>
      {
        comments && comments.map((comment) => {
          console.log(comment.activity_id)
          if (Number(comment.activity_id) === activityId) {
            return (<CommentComponent key={comment.id} comment={comment}/>)
          }
        })
      }
      <Form reply="reply" size='mini' onSubmit={this.handleSubmit}>
        <Form.TextArea style={{
            height: '50px'
          }} name='post' value={post} onChange={this.handleChange} required="required"/>
        <Button content='Add Reply' labelPosition='left' icon='edit' primary="primary"/>
      </Form>
    </Comment.Group>)
  }
}

function mapStateToProps(state) {
  const {user} = state.authentication;
  const {comments} = state.users;
  return {user, comments};
}

const connectedCommentContainer = connect(mapStateToProps)(CommentContainer);
export {
  connectedCommentContainer as CommentContainer
};
