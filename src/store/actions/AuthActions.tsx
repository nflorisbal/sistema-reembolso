import { AppDispatch } from '..';
import { AxiosError } from 'axios';
import { AuthDTO } from '../../models/AuthDTO';
import api from '../../api';
import { Loading } from 'notiflix';

export const handleLogin = async (
  credentials: AuthDTO,
  dispatch: AppDispatch,
  navigate: Function,
  setStatus: Function
) => {
  try {
    Loading.circle();
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
      setStatus('Usuário/senha inválidos.');
    }
  } finally {
    Loading.remove();
  }
};

export const handleLogout = (dispatch: AppDispatch) => {
  const userAuthenticated = {
    type: 'SET_LOGOUT',
  };
  const listWipe = {
    type: 'WIPE_LIST',
  };

  localStorage.removeItem('token');
  dispatch(listWipe);
  dispatch(userAuthenticated);
};
