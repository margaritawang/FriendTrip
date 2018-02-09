import openSocket from 'socket.io-client';
import io from 'socket.io-client';
import {userActions} from '../_actions';
import {chatConstants} from '../_constants';

let socket = null;

export function chatMiddleware(store) {
  return next => action => {
    const result = next(action);
    if (socket && action.type === chatConstants.SENDING_MESSAGE) {
      let message = action.message;
      socket.emit('client', message);
    }
    if (socket && action.type === chatConstants.SENDING_ACTIVITY) {
      let activity = action.activity;
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
      let invite = action.invite;
      socket.emit('invite', invite);
    }
    return result;
  }
}

export default function wrapStore(store, address) {
  socket = io.connect(address);
  socket.on('message', data => {
    if (data.type === 'message') {
      store.dispatch(userActions.receiveMessage(data.data))
    }
    if (data.type === 'activity') {
      store.dispatch(userActions.receiveActivity(data.data))
    }
    if (data.type === 'comment') {
      store.dispatch(userActions.receiveComment(data.data))
    }
    if (data.type === 'deleteActivity') {
      store.dispatch(userActions.receiveDeleteActivity(data.data))
    }
    if (data.type === 'invite') {
      store.dispatch(userActions.receiveInvite(data.data))
    }
  });
}

export {
  wrapStore
}
