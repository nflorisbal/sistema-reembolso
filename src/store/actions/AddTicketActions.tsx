import { AppDispatch } from '..';
import api from '../../api';
import { newStatusDTO, TicketDTO } from '../../models/TicketDTO';

export const sendNewTicket = async (
  ticket: TicketDTO,
  dispatch: AppDispatch,
  token: any
) => {
  const sendTitle = { title: ticket.title };

  try {
    const { data } = await api.post(
      `/refund/`,
      sendTitle,
      (api.defaults.headers.common['Authorization'] = token)
    );

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
  } catch (error) {
    console.log(error);
  }
};
