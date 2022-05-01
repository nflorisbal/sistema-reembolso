import { AppDispatch } from '..';
import api from '../../api';
import { newStatusDTO, TicketDTO } from '../../models/TicketDTO';
import { Notify, Block } from 'notiflix';

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
    Notify.failure(ERROR_MSG_ACTION);
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
    Notify.failure(ERROR_MSG_ACTION);
  }
};

export const updateItemAction = async (
  item: any,
  token: any,
  id: any,
  navigate: Function, 
  dispatch: AppDispatch
) => {
  const ticketDataUpdated = new FormData();
  ticketDataUpdated.append('dateItem', item.dateItem);
  ticketDataUpdated.append('name', item.name);
  ticketDataUpdated.append('idItem', id);

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
    Notify.success(SUCCESS_MSG_UPDATE_ITEM);
    navigate('/');
    const wipeItem = {type: 'WIPE_LIST'}
    dispatch(wipeItem)
  } catch (error) {
    Notify.failure(ERROR_MSG_ACTION);
  } finally {
    Block.remove('.addTicket');
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
    Notify.failure(ERROR_MSG_ACTION);
  } finally {
    Block.remove('.addTicket');
  }
};
