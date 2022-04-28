import { Notify } from 'notiflix';
import { handleLogin } from './AuthActions';
import { AppDispatch } from '..';
import { SignUpDTO } from '../../models/SignUpDTO';
import api from '../../api';

export const createUser = async (
  newUser: SignUpDTO,
  dispatch: AppDispatch,
  navigate: Function,
  setStatus: Function
) => {
  const formData = new FormData();
  formData.append('name', newUser.name);
  formData.append('email', newUser.email);
  formData.append('password', newUser.password);
  formData.append('image', newUser.image as File);

  try {
    await api.post('/user/saveUser', formData);
    const stateNewUser = { ...newUser, type: 'CREATE_USER' };
    dispatch(stateNewUser);
    Notify.success('Cadastro realizado com sucesso');
    setTimeout(() => {
      setupLoginAfterPost(newUser, dispatch, navigate, setStatus);
    }, 5000);
  } catch (error) {
    console.log(error);
    Notify.failure('Houve algum erro. Revise os dados e tente novamente.');
  }
};

export const createUserAdmin = async (
  newUser: SignUpDTO,
  dispatch: AppDispatch,
  resetForm: Function,
  token: any
) => {
  const formData = new FormData();

  formData.append('name', newUser.name);
  formData.append('email', newUser.email);
  formData.append('password', newUser.password);
  formData.append('role', newUser.role);
  formData.append('image', newUser.image as File);

  try {
    await api.post(
      `/user/saveAdmin`,
      formData,
      (api.defaults.headers.common['Authorization'] = token)
    );
    const stateNewUser = { ...newUser, type: 'CREATE_USER' };
    dispatch(stateNewUser);
    Notify.success('Cadastro realizado com sucesso');
    resetForm();
  } catch (error) {
    console.log(error);
    Notify.failure('Houve algum erro. Revise os dados e tente novamente.');
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
  handleLogin(loginNewUser, dispatch, navigate, setStatus);
};
