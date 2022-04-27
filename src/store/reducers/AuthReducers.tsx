import { AnyAction } from 'redux';
import { CredentialDTO } from '../../models/AuthDTO';

export const INITIAL_STATE = {
  email: '',
  image: '',
  name: '',
  token: '',
  roles: [
    {
      idRole: 0,
      role: '',
    },
  ],
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
        email: action.email,
        image: action.image,
        name: action.name,
        roles: action.roles,
        token: action.token,
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
