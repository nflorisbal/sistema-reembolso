import { AppDispatch } from '..';
import { AuthDTO } from '../../models/AuthDTO';
import api from '../../api';
import { AxiosError } from 'axios';

export const handleLogin = async (
  credentials: AuthDTO,
  dispatch: AppDispatch,
  navigate: Function
) => {
  //usuario para teste, substituir por credentials futuramente
  const user = {
    login: 'financeiro@dbccompany.com.br',
    password: 'financeiro',
  };

  try {
    const { data } = await api.post('/auth', user);

    const userAuthenticated = {
      type: 'SET_LOGIN',
      name: data.name,
      username: credentials.login,
      image: data.image,
      token: data.token,
      role: data.role,
      isLogged: true,
    };

    api.defaults.headers.common['Authorization'] = data.token;
    localStorage.setItem('token', JSON.stringify(data.token));
    dispatch(userAuthenticated);
    navigate('/');
  } catch (error) {
    const { response } = error as AxiosError;
    console.log(response);
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
