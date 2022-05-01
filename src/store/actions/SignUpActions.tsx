import { Block, Loading, Notify } from 'notiflix';
import { handleLogin } from './AuthActions';
import { AppDispatch } from '..';
import { ConfigUserDTO, SignUpDTO } from '../../models/SignUpDTO';
import api from '../../api';

const SUCCESS_MSG_UPDATE = 'Cadastro atualizado com sucesso.';
const SUCCESS_MSG_CREATE = 'Cadastro realizado com sucesso.';
const ERROR_MSG_ACTION =
  'Erro ao processar sua solicitação. Revise os dados e tente novamente.';

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
    setupLoginAfterPost(newUser, dispatch, navigate, setStatus);
  } catch (error) {
    console.log(error);
    Notify.failure(ERROR_MSG_ACTION);
  } finally {
    Block.remove('.signup');
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
    Notify.success(SUCCESS_MSG_CREATE);
    resetForm();
  } catch (error) {
    console.log(error);
    Notify.failure(ERROR_MSG_ACTION);
  } finally {
    Loading.remove();
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

export const editingUser = async (
  user: ConfigUserDTO,
  dispatch: AppDispatch,
  token: any, 
  navigate: Function
) => {
  const updatedUser: any = new FormData();

  updatedUser.append('name', user.name);
  updatedUser.append('email', user.email);
  updatedUser.append('password', user.password);
  updatedUser.append('image', user.image as File);

  try {
    const { data } = await api.post(
      'user/updateUser',
      updatedUser,
      (api.defaults.headers.common['Authorization'] = token)
    );

    user.image = data.image;
    Notify.success(SUCCESS_MSG_UPDATE);
    const stateUser = { ...user, type: 'UPDATE_USER' };
    const updateStateUser = { ...user, type: 'SET_UPDATE' };
    dispatch(stateUser);
    dispatch(updateStateUser);
    navigate("/")
  } catch (error) {
    Notify.failure(ERROR_MSG_ACTION);
  }finally {
    Block.remove('.updateUser');

  }
};

export const updateUserAdmin = async (
  updatedUser: SignUpDTO,
  dispatch: AppDispatch,
  token: any,
  id: string | undefined,
  navigate: Function
) => {
  const updatedUserData = new FormData();

  updatedUserData.append('name', updatedUser.name);
  updatedUserData.append('email', updatedUser.email);
  updatedUserData.append('role', updatedUser.role);
  if (updatedUser.image !== undefined) {
    updatedUserData.append('image', updatedUser.image as File);
  }
  if (updatedUser.password !== '') {
    updatedUserData.append('password', updatedUser.password);
  }

  try {
    await api.post(
      `/user/updateAdmin/${id}`,
      updatedUserData,
      (api.defaults.headers.common['Authorization'] = token)
    );
    Notify.success(SUCCESS_MSG_UPDATE);
    const actionUpdatedUser = { ...updatedUser, type: 'UPDATE_USER_ADMIN' };
    dispatch(actionUpdatedUser);
    navigate('/');
  } catch (error) {
    console.log(error);
    Notify.failure(ERROR_MSG_ACTION);
  } finally {
    Block.remove('.updateUser');
  }
};

export const getUserById = async (
  id: string,
  dispatch: AppDispatch,
  token: any
) => {
  try {
    const { data } = await api.get(
      `/user/${id}`,
      (api.defaults.headers.common['Authorization'] = token)
    );
    const updatedUserAdmin = { ...data, type: 'UPDATE_USER_ADMIN' };
    dispatch(updatedUserAdmin);
  } catch (error) {
    console.log(error);
  } finally {
    Loading.remove();
  }
};
