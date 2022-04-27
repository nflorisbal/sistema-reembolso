import { AppDispatch } from '..';
import api from '../../api';

export const listTickets = async (dispatch: AppDispatch, token: any) => {
  try {
    const { data } = await api.get(
      '/refund/?page=0&size=10',
      (api.defaults.headers.common['Authorization'] = token)
    );

    const tickets = {
      type: 'LIST_TICKETS',
      tickets: data.content,
      totalPages: data.totalPages,
      totalElements: data.totalElements,
      loading: false,
    };

    dispatch(tickets);
  } catch (error) {
    console.log(error);
  }
};
