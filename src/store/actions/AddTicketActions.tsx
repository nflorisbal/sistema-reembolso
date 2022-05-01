import { AppDispatch } from '..';
import api from '../../api';
import { newStatusDTO, TicketDTO } from '../../models/TicketDTO';
import { Notify } from 'notiflix';

const SUCCESS_MSG_UPDATE_TICKET = 'Ticket atualizado com sucesso.';
const SUCCESS_MSG_UPDATE_ITEM = 'Item atualizado com sucesso.';
const SUCCESS_MSG_CREATE = 'Cadastro realizado com sucesso.';
const ERROR_MSG_ACTION =
  'Erro ao processar sua solicitação. Revise os dados e tente novamente.';

export const sendNewTicket = async (
  ticket: TicketDTO,
  dispatch: AppDispatch,
  token: any,
  navigate: Function
) => {
  const sendTitle = { title: ticket.title };

  try {
    const { data } = await api.post(
      `/refund/`,
      sendTitle,
      (api.defaults.headers.common['Authorization'] = token)
    );
    Notify.success('Pedido realizado com sucesso');
    ticket.items.forEach(async (item) => {
      const ticketData = new FormData();
      ticketData.append('dateItem', item.dateItem);
      ticketData.append('image', item.image as File);
      ticketData.append('name', item.name);
      let newValue = item.value.replaceAll('.', '').replaceAll(',', '.');
      ticketData.append('value', newValue);
      await api.post(
        `/item/${data}`,
        ticketData,
        (api.defaults.headers.common['Authorization'] = token)
      );
    });
    const stateTicket = { ...ticket, type: 'ADD_TICKET' };
    setTimeout(() => {
      navigate('/');
    }, 3000);
    dispatch(stateTicket);
  } catch (error) {
    console.log(error);
    Notify.failure('Houve algum erro. Revise os dados e tente novamente.');
  }
};

export const updateStatusTicket = async (
  id: number,
  newStatus: newStatusDTO,
  token: any
) => {
  try {
    await api.put(
      `/refund/updateStatus?id=${id}`,
      newStatus,
      (api.defaults.headers.common['Authorization'] = token)
    );
    Notify.success('Ação realizada com sucesso');
  } catch (error) {
    console.log(error);
    Notify.failure('Houve algum erro. Revise os dados e tente novamente.');
  }
};

<<<<<<< HEAD
export const updateItemAction = async (item:any, token:any, id:any, navigate: Function) => {
=======
export const updateItemAction = async (item: any, token: any, id: any) => {
>>>>>>> 1b8f76243b44f07eb06f52e02a3bb0a46dcb4109
  const ticketDataUpdated = new FormData();
  ticketDataUpdated.append('dateItem', item.dateItem);
  ticketDataUpdated.append('name', item.name);
  ticketDataUpdated.append('idItem', id);
  console.log(item.value, 'string');
  console.log(item.image, 'image');
  if (item.image !== undefined && item.image !== '') {
    ticketDataUpdated.append('image', item.image as File);
  }
  let newValue = item.value.toString().replaceAll('.', '').replaceAll(',', '.');
  ticketDataUpdated.append('value', newValue);
  try {
    await api.post(
      `/item/updateItem/${id}`,
      ticketDataUpdated,
      (api.defaults.headers.common['Authorization'] = token)
    );
<<<<<<< HEAD
    Notify.success('Ação realizada com sucesso');
    navigate('/')
=======
    Notify.success(SUCCESS_MSG_UPDATE_ITEM);
>>>>>>> 1b8f76243b44f07eb06f52e02a3bb0a46dcb4109
  } catch (error) {
    Notify.failure(ERROR_MSG_ACTION);
  }
};

export const getItemById = async (
  id: string,
  dispatch: AppDispatch,
  token: any
) => {
  try {
    const { data } = await api.get(
      `/item/${id}`,
      (api.defaults.headers.common['Authorization'] = token)
    );
    const itemToUpdate = { items: [data], type: 'UPDATE_TICKET' };
    dispatch(itemToUpdate);
  } catch (error) {
    console.log(error);
  }
};
