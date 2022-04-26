import { AppDispatch } from '..';
import { SignUpDTO, IroleNumber } from '../../models/SignUpDTO';
import api from '../../api';
import { handleLogin } from './AuthActions';

export const createUser = async (
  newUser: SignUpDTO,
  dispatch: AppDispatch,
  navigate: Function,
  setStatus: Function
) => {

  try {
    await api.post('/user/saveUser', newUser);
    const stateNewUser = { ...newUser, type: 'CREATE_USER' };
    dispatch(stateNewUser);
    setupLoginAfterPost(newUser, dispatch, navigate, setStatus);
  } catch (error) {
    console.log(error);
  }
};



export const createUserAdmin = async (
  newUser: SignUpDTO,
  dispatch: AppDispatch,
  navigate: Function,
  token: any,
  roleNumber: IroleNumber
) => {
  console.log(newUser, 'dentro do actions do create');
  try {
    await api.post(
      `/user/saveAdmin?role=${roleNumber.role}`,
      newUser,
      (api.defaults.headers.common['Authorization'] = token)
    );
    const stateNewUser = { ...newUser, type: 'CREATE_USER' };
    dispatch(stateNewUser);
    navigate('/')
  } catch (error) {
    console.log(error);
  }
};

const setupLoginAfterPost = (
  user: SignUpDTO,
  dispatch: AppDispatch,
  navigate: Function,
  setStatus: Function
) => {
  const loginNewUser = {
    login: user.email,
    password: user.password,
  };
  handleLogin(loginNewUser, dispatch, navigate, setStatus)
};
