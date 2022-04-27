import { AnyAction } from 'redux';
import { ListUsersDTO } from '../../models/ListUsersDTO';

export const INITIAL_STATE_LIST_USERS = {
  loadingList: true,
  users: [],
  totalPages: 1,
  totalElements: 0,
};

const listUsersReducer = (
  state: ListUsersDTO = INITIAL_STATE_LIST_USERS,
  action: AnyAction
) => {
  switch (action.type) {
    case 'LIST_USERS':
      return {
        ...state,
        loadingList: false,
        users: action.users,
        totalPages: action.totalPages,
        totalElements: action.totalElements,
      };
    case 'WIPE_LIST':
      state = INITIAL_STATE_LIST_USERS;
      return state;
    default:
      return state;
  }
};

export default listUsersReducer;
