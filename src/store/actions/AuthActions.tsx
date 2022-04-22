import { AppDispatch } from '..';
import { AuthDTO } from '../../models/AuthDTO';
import api from '../../api';

export const handleLogin = async (
  credentials: AuthDTO,
  dispatch: AppDispatch,
  navigate: Function
) => {
  //usuario para teste, substituir por credentials futuramente
  const user = {
    login: 'admin',
    password: 'admin',
  };

  await api
    .post('/auth', user)
    .then((response) => {
      const { data } = response;
      console.log(data);

      const userAuthenticated = {
        type: 'SET_LOGIN',
        name: data.name,
        username: credentials.login,
        token: data.token,
        role: data.role,
        isLogged: true,
      };

      api.defaults.headers.common['Authorization'] = data.token;
      localStorage.setItem('token', JSON.stringify(data.token));
      dispatch(userAuthenticated);
      navigate('/');
    })
    .catch((error) => {
      console.log(error.response.status);
    });
};

export const handleLogout = (dispatch: AppDispatch) => {
  const userAuthenticated = {
    type: 'SET_LOGOUT',
  };
  dispatch(userAuthenticated);
};
