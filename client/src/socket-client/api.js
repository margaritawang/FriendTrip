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
      socket.emit('activity', activity);
    }
    if (socket && action.type === chatConstants.SENDING_COMMENT) {
      let comment = action.comment;
      socket.emit('comment', comment);
    }
    return result;
  }
}

export default function wrapStore(store) {
  socket = io.connect(`http://localhost:8090`);
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
  });
}

export {
  wrapStore
}
