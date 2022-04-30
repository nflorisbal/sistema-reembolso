import { Loading, Notify } from 'notiflix';
import { handleLogin } from './AuthActions';
import { AppDispatch } from '..';
import { ConfigUserDTO, SignUpDTO } from '../../models/SignUpDTO';
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
  } finally {
    Loading.remove();
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
  token: any
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
    Notify.success('Cadastro atualizado com sucesso');
    const stateUser = { ...user, type: 'UPDATE_USER' };
    const updateStateUser = { ...user, type: 'SET_UPDATE' };
    dispatch(stateUser);
    dispatch(updateStateUser);
  } catch (error) {
    Notify.failure('Houve algum erro. Revise os dados e tente novamente.');
  }
};

export const updateUserAdmin = async (
  updatedUser: SignUpDTO,
  dispatch: AppDispatch,
  token: any,
  id: string | undefined,
  navigate: Function
) => {
  console.log(updatedUser, 'updated');
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
    Notify.success('Cadastro atualizado com sucesso');
    const actionUpdatedUser = { ...updatedUser, type: 'UPDATE_USER_ADMIN' };
    dispatch(actionUpdatedUser);
    setTimeout(() => {
      navigate('/');
    }, 2000);
  } catch (error) {
    console.log(error);
    Notify.failure('Houve algum erro. Revise os dados e tente novamente.');
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
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
