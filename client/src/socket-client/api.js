import openSocket from 'socket.io-client';
import io from 'socket.io-client';
import { planActions } from '../_actions';
//const socket = openSocket('http://localhost:8090');
//
function subscribeToTimer(cb) {
//   socket.on('timer', timestamp => cb(null, timestamp));
//   socket.emit('subscribeToTimer', 1000);
//
 }

function addNewPlan(cb, plan) {
  socket.on('added', plans => cb(null, plans));
  socket.emit('addNewPlan', plan);
}


function wrapStore(store) {
  const socket =  openSocket('http://localhost:8090');
  console.log("try to connnect")
  socket.on('message', message => {
    store.dispatch(planActions.addNewPlan(message))
  })
}



export { wrapStore }
