import { AnyAction } from 'redux';
import { AuthDTO } from '../../models/AuthDTO';

export const INITIAL_STATE = {
  login: '',
  password: '',
};

const authReducer = (state: AuthDTO = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case 'SET_LOGIN':
      return {
        ...state,
        login: action.login,
      };
    case 'SET_LOGOUT':
      state = INITIAL_STATE;
      return state;
    default:
      return state;
  }
};

export default authReducer;
