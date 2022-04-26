import { AppDispatch } from '..';
import { AxiosError } from 'axios';
import { AuthDTO } from '../../models/AuthDTO';
import api from '../../api';

export const handleLogin = async (
  credentials: AuthDTO,
  dispatch: AppDispatch,
  navigate: Function,
  setStatus: Function
) => {
  try {
    const { data } = await api.post('/auth', credentials);

    const userAuthenticated = {
      type: 'SET_LOGIN',
      name: data.name,
      email: data.email,
      image: data.image,
      token: data.token,
      roles: data.roles,
      isLogged: true,
    };

    api.defaults.headers.common['Authorization'] = data.token;
    localStorage.setItem('token', data.token);
    dispatch(userAuthenticated);
    navigate('/');
  } catch (error) {
    const { response } = error as AxiosError;
    if (response?.status === 403) {
      setStatus('Usuário ou senha inválido.');
    }
  }
};

export const handleLogout = (dispatch: AppDispatch, navigate: Function) => {
  const userAuthenticated = {
    type: 'SET_LOGOUT',
  };
  localStorage.removeItem('token');
  dispatch(userAuthenticated);
  navigate('/login');
};
