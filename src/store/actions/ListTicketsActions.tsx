import { Block } from 'notiflix';
import { AppDispatch } from '..';
import api from '../../api';

export const listTickets = async (
  dispatch: AppDispatch,
  token: any,
  pages: number
) => {
  try {
    const { data } = await api.get(
      `/refund/?page=${pages}&size=5`,
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
  } finally {
    Block.remove('.listTickets');
  }
};

export const listTicketsByName = async (
  dispatch: AppDispatch,
  token: any,
  name: string
) => {
  try {
    const { data } = await api.get(
      `/refund/findByUserName?name=${name}&page=0&size=10`,
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
  } finally {
    Block.remove('.listTickets');
  }
};

export const deleteTicket = async (token: any, id: number) => {
  try {
    await api.delete(
      `/refund/?id=${id}`,
      (api.defaults.headers.common['Authorization'] = token)
    );
  } catch (error) {
    console.log(error);
  } finally {
    Block.remove('.listTickets');
  }
};
