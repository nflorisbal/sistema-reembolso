import { AppDispatch } from '..';
import api from '../../api';
import { TicketDTO } from '../../models/TicketDTO';

export const sendNewTicket = async (
  ticket: TicketDTO,
  dispatch: AppDispatch,
  token: any
) => {
  const ticketData = new FormData();
  ticketData.append('title', ticket.title);
  ticketData.append('items', JSON.stringify(ticket.items));
  // formData.append('',ticket.)

  console.log(ticket);

  // try {
  //     await api.post('/refund/', ticket, api.defaults.headers.common['Authorization'] = token)
  //     const stateTicket = {...ticket, type: 'ADD_TICKET'}
  //     dispatch(stateTicket)
  // } catch (error) {
  //     console.log(error)
  // }
};
