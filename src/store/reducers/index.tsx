import { combineReducers } from 'redux';
import authReducer from './AuthReducers';
import signUpReducer from './SignUpReducer'
import listUsersReducer from './ListUsersReducer';

export default combineReducers({
  auth: authReducer, signup: signUpReducer, list: listUsersReducer
});
