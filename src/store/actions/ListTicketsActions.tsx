import { Block } from 'notiflix';
import { AppDispatch } from '..';
import { Notify } from 'notiflix';
import api from '../../api';

const SUCCESS_MSG_DELETE = 'Ticket removido com sucesso.';
const ERROR_MSG_ACTION =
  'Erro ao processar sua solicitação. Revise os dados e tente novamente.';

export const listTickets = async (
  dispatch: AppDispatch,
  token: any,
  pages: number
) => {
  try {
    const { data } = await api.get(
      `/refund/?page=${pages}&size=10`,
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
    Notify.failure(ERROR_MSG_ACTION);
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
    Notify.failure(ERROR_MSG_ACTION);
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
    Notify.success(SUCCESS_MSG_DELETE);
  } catch (error) {
    console.log(error);
    Notify.failure(ERROR_MSG_ACTION);
  } finally {
    Block.remove('.listTickets');
  }
};
