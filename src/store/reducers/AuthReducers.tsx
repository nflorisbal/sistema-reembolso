import { AnyAction } from 'redux';
import { AuthDTO } from '../../models/AuthDTO';

export const INITIAL_STATE = {
    usuario: '',
    senha: '',
};

const authReducer = (state: AuthDTO = INITIAL_STATE, action: AnyAction) => {
  return state;
};

export default authReducer;
