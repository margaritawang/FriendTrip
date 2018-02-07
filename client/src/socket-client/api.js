import openSocket from 'socket.io-client';
import io from 'socket.io-client';
import {userActions} from '../_actions';
import {chatConstants} from '../_constants';
//const socket = openSocket('http://localhost:8090');

let socket = null;

export function chatMiddleware(store) {
  return next => action => {
    const result = next(action);
    console.log('action type', action.type);
    if (socket && action.type === chatConstants.SENDING_MESSAGE) {
      let message = action.message;
      socket.emit('client', message);
    }
    if (socket && action.type === chatConstants.SENDING_ACTIVITY) {
      let activity = action.activity;
      console.log("send activity", action.activity)
      socket.emit('activity', activity);
    }
    if (socket && action.type === chatConstants.SENDING_COMMENT) {
      let comment = action.comment;
      socket.emit('comment', comment);
    }
    if (socket && action.type === chatConstants.DELECTING_ACTIVITY) {
      let activityId = action.activityid;
      socket.emit('deleteActivity', activityId);
    }
    if (socket && action.type === chatConstants.DELECTING_ACTIVITY) {
      let activityId = action.activityid;
      socket.emit('deleteActivity', activityId);
    }
    if (socket && action.type === chatConstants.SENDING_INVITE) {
      console.log('sending invite!!!_---')
      let invite = action.invite;
      socket.emit('invite', invite);
    }
    return result;
  }
}

export default function wrapStore(store, address) {
  socket = io.connect(address);
  console.log("try to connnect 1")
  socket.on('message', data => {
    if (data.type === 'message') {
      console.log(data);
      store.dispatch(userActions.receiveMessage(data.data))
    }
    if (data.type === 'activity') {
      console.log("receive ac", data)
      store.dispatch(userActions.receiveActivity(data.data))
    }
    if (data.type === 'comment') {
      console.log("receive comment", data)
      store.dispatch(userActions.receiveComment(data.data))
    }
    if (data.type === 'deleteActivity') {
      console.log("receive deleteActivity", data)
      store.dispatch(userActions.receiveDeleteActivity(data.data))
    }
    if (data.type === 'invite') {
      console.log("receive invite", data)
      store.dispatch(userActions.receiveInvite(data.data))
    }
  });
}

export {
  wrapStore
}
