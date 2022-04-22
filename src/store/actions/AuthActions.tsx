import { AppDispatch } from '..';
import { AuthDTO } from '../../models/AuthDTO';
import api from '../../api';
import { hasToken } from '../../utils';

export const handleLogin = async (
  credentials: AuthDTO,
  dispatch: AppDispatch,
  navigate: Function
) => {
  //usuario para teste, substituir por credentials futuramente
  const user = {
    usuario: 'admin',
    senha: '123',
  };

  await api
    .post('/auth', user)
    .then((response) => {
      const { data } = response;
      const userAuthenticated = {
        type: 'SET_LOGIN',
        // fullname: data.fullname,
        username: credentials.username,
        token: data,
        // role: data.role,
        isLogged: true,
      };

      api.defaults.headers.common['Authorization'] = data;
      localStorage.setItem('token', JSON.stringify(data));
      dispatch(userAuthenticated);
      navigate('/');
    })
    .catch((error) => {
      console.log(error.response.status);
    });
};

// export const setToken = () =>{
//   if
// }

export const handleLogout = () => {};
