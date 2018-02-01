import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { trips } from './trips.reducer';
import { plan } from './plan.reducer';


const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  plan
});

export default rootReducer;
