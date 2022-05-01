import { AnyAction } from 'redux';

export const INITIAL_STATE_TICKET = {
  title: '',
  items: [
    {
      name: '',
      dateItem: '',
      value: '',
    },
  ],
};

const addTicketReducer = (
  state: any = INITIAL_STATE_TICKET,
  action: AnyAction
) => {
  switch (action.type) {
    case 'ADD_TICKET':
      return {
        ...state,
        title: action.title,
        items: action.items,
      };
    case 'UPDATE_TICKET':
      return {
        ...state,
        items: action.items,
      };
    default:
      return state;
  }
};

export default addTicketReducer;
