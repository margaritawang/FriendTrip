import { chatConstants } from '../_constants';


export const chatActions = {
    receving,
    received
};

function receving(message) {
  return { type: chatConstants.INCOMING_MESSAGE, message };
}

function received(message) {
  return { type: chatConstants.SENDING_MESSAGE, message };
}
