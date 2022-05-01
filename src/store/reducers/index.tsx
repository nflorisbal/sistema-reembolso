import { combineReducers } from 'redux';
import authReducer from './AuthReducers';
import userReducer from './UserReducer';
import listUsersReducer from './ListUsersReducer';
import ticketReducer from './TicketReducer';
import listTicketsReducer from './ListTicketsReducer';

export default combineReducers({
  auth: authReducer,
  signup: userReducer,
  list: listUsersReducer,
  add: ticketReducer,
  tickets: listTicketsReducer,
});
