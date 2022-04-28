import { AppDispatch } from '..';
import api from '../../api';
import ListTickets from '../../components/listtickets/ListTickets';
import { TicketDTO } from '../../models/TicketDTO';

interface sendticket {
  title: string;
  items: [];
}
export const sendNewTicket = async (
  ticket: sendticket,
  dispatch: AppDispatch,
  token: any
) => {
  const ticketData = new FormData();
  ticketData.append('title', ticket.title);
 

  console.log(ticketData.getAll('items[]'));

  console.log(ticket);
  console.log(token);

  try {
    const {data} = await api.post('/refund/', ticket.title, 
    ticket.items.forEach((item) =>{
      
    })
    const stateTicket = { ...ticket, type: 'ADD_TICKET' };
    dispatch(stateTicket);
  } catch (error) {
    console.log(error);
  }
};

// {
//   headers: {
//     'Content-Type': 'multipart/form-data',
//     Authorization: `${token}`,
//   },
// });
