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
  loading: true
};

const ticketReducer = (
  state: any = INITIAL_STATE_TICKET,
  action: AnyAction
) => {
  switch (action.type) {
    case 'ADD_TICKET':
      return {
        ...state,
        title: action.title,
        items: action.items,
        loading: true
      };
    case 'UPDATE_TICKET':
      return {
        ...state,
        items: action.items,
        loading: false
      };
      case 'WIPE_LIST':
      state = INITIAL_STATE_TICKET;
      return state;
    default:
      return state;
  }
};

export default ticketReducer;
