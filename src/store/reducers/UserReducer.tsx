import { AnyAction } from 'redux';
import { ConfigUserDTO, SignUpDTO } from '../../models/SignUpDTO';

export const INITIAL_STATE_SIGNUP = {
  name: '',
  password: '',
  confirmPassword: '',
  email: '',
  role: '',
  image: undefined,
};

const userReducer = (
  state: SignUpDTO | ConfigUserDTO = INITIAL_STATE_SIGNUP,
  action: AnyAction
) => {
  switch (action.type) {
    case 'CREATE_USER':
      return {
        ...state,
        name: action.name,
        password: action.password,
        confirmPassword: action.confirmPassword,
        role: action.role,
        email: action.email,
        image: action.image,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        name: action.name,
        password: action.password,
        role: action.role,
        email: action.email,
        image: action.image,
      };
    case 'UPDATE_USER_ADMIN':
      return {
        ...state,
        name: action.name,
        password: action.password,
        role: action.roleEntities,
        email: action.email,
        image: action.image,
      };
    default:
      return state;
  }
};

export default userReducer;
