import { AppDispatch } from '..';
import { SignUpDTO } from '../../models/SignUpDTO';
import api from '../../api';

export const createUser = async (
  newUser: SignUpDTO,
  dispatch: AppDispatch,
  navigate: Function
) => {
  try {
    await api.post('/user/saveUser', newUser);
    const stateNewUser = { ...newUser, type: 'CREATE_USER' };
    dispatch(stateNewUser);
    setupLoginAfterPost(newUser, dispatch, navigate);
  } catch (error) {
    console.log(error);
  }
};

export const createUserAdmin = async (
  newUser: SignUpDTO,
  dispatch: AppDispatch,
  navigate: Function,
  token: any
) => {
  console.log(newUser, 'dentro do actions do create');
  try {
    await api.post(
      '/user/saveAdmin?role=2',
      newUser,
      (api.defaults.headers.common['Authorization'] = token)
    );
    const stateNewUser = { ...newUser, type: 'CREATE_USER' };
    dispatch(stateNewUser);
    setupLoginAfterPost(newUser, dispatch, navigate);
  } catch (error) {
    console.log(error);
  }
};

const setupLoginAfterPost = (
  user: SignUpDTO,
  dispatch: AppDispatch,
  navigate: Function
) => {
  const loginNewUser = {
    login: user.email,
    password: user.password,
  };
  // handleLogin(loginNewUser, dispatch, navigate)
};
