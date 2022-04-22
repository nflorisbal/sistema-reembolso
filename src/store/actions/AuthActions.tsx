import { AppDispatch } from '..';
import { AuthDTO } from '../../models/AuthDTO';
import api from '../../api';

export const handleLogin = async (
  values: AuthDTO,
  dispatch: AppDispatch,
  navigate: Function
) => {
  //usuario para teste, substituir por values futuramente
  const user = {
    usuario: 'admin',
    senha: '123',
  };

  console.log(navigate);

  await api
    .post('/auth', user)
    .then((response) => {
      const { data } = response;
      navigate('/');
    })
    .catch((error) => {
      console.log(error.response.status);
    });
};

export const handleLogout = () => {};
