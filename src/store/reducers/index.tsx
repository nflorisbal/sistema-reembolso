import { combineReducers } from 'redux';
import authReducer from './AuthReducers';
import signUpReducer from './SignUpReducer'

export default combineReducers({
  authReducer, signUpReducer
});
