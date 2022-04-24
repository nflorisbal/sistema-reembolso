import { AnyAction } from 'redux';
import { TicketDTO } from '../../models/TicketDTO';

export const INITIAL_STATE_TICKET = {
  title: '',
  items: [
    {
      nameItem: '',
      dateItem: '',
      sum: '',
      attachment: '',
    },
  ],
};

const addTicketReducer = (
  state: TicketDTO = INITIAL_STATE_TICKET,
  action: AnyAction
) => {
  switch (action.type) {
    case 'ADD_TICKET':
      return {
        ...state,
        title: action.title,
        items: action.items
      };
    default:
      return state;
  }
};
