import { AppDispatch } from '..';
import api from '../../api';

export const listAllUsers = async (dispatch: AppDispatch, token: any) => {
  try {
    const { data } = await api.get(
      `/user/listAllUserOrderById?requestPage=0&sizePage=10`,
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
  }
};
