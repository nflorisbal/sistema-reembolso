import { AppDispatch } from '..';
import { AuthDTO } from '../../models/AuthDTO';
import api from '../../api';

export const handleLogin = async (values: AuthDTO, dispatch: AppDispatch) => {
  //usuario para teste, substituir por values futuramente
  const user = {
    usuario: 'admin',
    senha: '123',
  };

  await api
    .post('/auth', user)
    .then((response) => {
      const { data } = response;
      console.log(data);
    })
    .catch((error) => {
      console.log(error.response.status);
    });
};

export const handleLogout = () => {};
