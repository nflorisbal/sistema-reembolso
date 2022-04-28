import { AnyAction } from 'redux';
import { ArrayTicketDTO } from '../../models/TicketDTO';

export const INITIAL_STATE_GET_TICKET: ArrayTicketDTO = {
  ticketsList: [
    {
      date: '',
      idRefund: 0,
      status: '',
      title: '',
      value: 0,
      items: [
        {
          dateItem: '',
          name: '',
          value: '',
          image: ''
        },
      ],
    },
  ],
  loadingTickets: true,
  totalPages: 1,
  totalElements: 0,
};

const listTicketsReducer = (
  state = INITIAL_STATE_GET_TICKET,
  action: AnyAction
) => {
  switch (action.type) {
    case 'LIST_TICKETS':
      return {
        ...state,
        loadingTickets: false,
        ticketsList: action.tickets,
        totalPages: action.totalPages,
        totalElements: action.totalElements,
      };
    case 'WIPE_TICKETS':
      state = INITIAL_STATE_GET_TICKET;
      return state;
    default:
      return state;
  }
};

export default listTicketsReducer;
