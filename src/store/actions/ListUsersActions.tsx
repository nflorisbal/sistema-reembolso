import { Loading } from 'notiflix';
import { AppDispatch } from '..';
import { ListUsersDTO } from '../../models/ListUsersDTO';
import api from '../../api';

export const listAllUsers = async (
  users: ListUsersDTO,
  dispatch: AppDispatch,
  token: any,
  page: number,
) => {
  try {
    const { data } = await api.get(
      `/user/listAllUserOrderById?requestPage=${page}&sizePage=10`,
      (api.defaults.headers.common['Authorization'] = token)
    );
    const list = { users: data, type: 'LIST_USERS' };
    dispatch(list);
    Loading.remove();
  } catch (error) {
    console.log(error);
  }
};
