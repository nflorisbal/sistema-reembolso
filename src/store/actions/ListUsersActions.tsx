import { Loading } from 'notiflix';
import { AppDispatch } from '..';
import { ListUsersDTO } from '../../models/ListUsersDTO';
import api from '../../api';

export const listAllUsers = async (
  users: ListUsersDTO,
  dispatch: AppDispatch,
  token: any
) => {
  try {
    const { data } = await api.get(
      '/user/listAllUser',
      (api.defaults.headers.common['Authorization'] = token)
    );
    const list = { users: data, type: 'LIST_USERS' };
    dispatch(list);
    Loading.remove();
  } catch (error) {
    console.log(error);
  }
};
