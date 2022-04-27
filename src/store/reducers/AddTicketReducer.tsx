import { AnyAction } from 'redux';
import { TicketDTO } from '../../models/TicketDTO';

export const INITIAL_STATE_TICKET = {
  title: '',
  items: [
    {
      name: '',
      dateItem: '',
      value: 0,
      image: '',
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

export default addTicketReducer
