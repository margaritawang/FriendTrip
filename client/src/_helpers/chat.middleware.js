import { userActions } from '../_actions';
import { chatConstants } from '../_constants';

let socket = null;

export function chatMiddleware(store) {
  return next => action => {
    const result = next(action);
    if (socket && action.type === chatConstants.SENDING_MESSAGE) {
      let message = action.message;
      socket.emit('client', message);
    }
    return result;
  }
}

// 
// export default function wrapStore(store) {
//   const socket =  openSocket('http://localhost:8090');
//   console.log("try to connnect")
//   socket.on('message', message => {
//     store.dispatch(userActions.receiveMessage(message))
//   })
// }
