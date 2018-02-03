import { chatConstants } from '../_constants';

export function chat(state = { msgs: []}, action) {
  console.log("msgs");
  const { msgs } = state;
  switch (action.type) {
    case chatConstants.INCOMING_MESSAGE:
      return {
        ...state,
        msgs: [...msgs, action.message],
        received: true
      }
    case chatConstants.SENDING_MESSAGE:
      return {
        ...state,
          sending: true
      }

    case chatConstants.SENDING_ACTIVITY:
      return {
        ...state,
        item: action.activity,
        sending: true
      }
    default:
      return state
  }
}
