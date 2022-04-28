import { AppDispatch } from '..';
import api from '../../api';
import ListTickets from '../../components/listtickets/ListTickets';
import { TicketDTO } from '../../models/TicketDTO';


export const sendNewTicket = async (
  ticket: TicketDTO,
  dispatch: AppDispatch,
  token: any
) => {

  console.log(ticket.title, "oi");
  console.log(token);
 

  try {
    const { data } = await api.post(
     ` /refund/?refundTitle=${ticket.title}`,
      undefined,
      (api.defaults.headers.common['Authorization'] = token)
    );
    console.log(data)
    // ticket.items.forEach(async (item) => {
    //   const ticketData = new FormData();
    //   ticketData.append('dateItem', item.dateItem);
    //   ticketData.append('image', item.image as File);
    //   ticketData.append('name', item.name);
    //   ticketData.append('value', item.value);
    //   await api.post(`/refund/${data}`, ticketData, (api.defaults.headers.common['Authorization'] = token))
    // });
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
