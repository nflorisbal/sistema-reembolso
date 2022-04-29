import { Block } from 'notiflix';
import { AppDispatch } from '..';
import api from '../../api';

export const listAllUsers = async (
  dispatch: AppDispatch,
  token: any,
  page: number
) => {
  try {
    const { data } = await api.get(
      `/user/listAllUserOrderById?requestPage=${page}&sizePage=10`,
      (api.defaults.headers.common['Authorization'] = token)
    );

    const list = {
      type: 'LIST_USERS',
      users: data.content,
      totalPages: data.totalPages,
      totalElements: data.totalElements,
      loading: false,
    };

    dispatch(list);
  } catch (error) {
    console.log(error);
  } finally {
    Block.remove('.listUser');
  }
};

export const listUsersByName = async (
  dispatch: AppDispatch,
  token: any,
  name: string
) => {
  try {
    const { data } = await api.get(
      `/user/findUserByName?name=${name}`,
      (api.defaults.headers.common['Authorization'] = token)
    );

    const list = {
      type: 'LIST_USERS',
      users: data,
      loading: false,
    };

    dispatch(list);
  } catch (error) {
    console.log(error);
  } finally {
    Block.remove('.listUser');
  }
};

