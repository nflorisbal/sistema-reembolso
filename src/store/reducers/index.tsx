import { combineReducers } from 'redux';
import authReducer from './AuthReducers';
import signUpReducer from './SignUpReducer';
import listUsersReducer from './ListUsersReducer';
import addTicketReducer from './AddTicketReducer';
import listTicketsReducer from './ListTicketsReducer';

export default combineReducers({
  auth: authReducer,
  signup: signUpReducer,
  list: listUsersReducer,
  add: addTicketReducer,
  tickets: listTicketsReducer
});
