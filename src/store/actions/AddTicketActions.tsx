import { AppDispatch } from '..';
import api from '../../api';
import { newStatusDTO, TicketDTO } from '../../models/TicketDTO';
import { Notify } from 'notiflix';

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
      navigate('/')
    }, 4000);
    dispatch(stateTicket);
  } catch (error) {
    console.log(error);
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
  }
};
