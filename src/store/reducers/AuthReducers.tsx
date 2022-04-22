import { AnyAction } from 'redux';
import { CredentialDTO } from '../../models/AuthDTO';

export const INITIAL_STATE = {
  name: '',
  login: '',
  token: '',
  role: '',
  isLogged: false,
};

const authReducer = (
  state: CredentialDTO = INITIAL_STATE,
  action: AnyAction
) => {
  switch (action.type) {
    case 'SET_LOGIN':
      return {
        ...state,
        name: action.name,
        login: action.login,
        token: action.token,
        role: action.role,
        isLogged: action.isLogged,
      };
    case 'SET_LOGOUT':
      state = INITIAL_STATE;
      return state;
    default:
      return state;
  }
};

export default authReducer;
