import { AnyAction } from 'redux';
import { ListUsersDTO } from '../../models/ListUsersDTO';

export const INITIAL_STATE_LIST_USERS = {
  users: [
    {
      name: '',
      idUser: 0,
      image: '',
      email: '',
      roleEntities: [
        {
          idRole: 0,
        },
      ],
    },
  ],
};

const listUsersReducer = (
  state: ListUsersDTO = INITIAL_STATE_LIST_USERS,
  action: AnyAction
) => {
  switch (action.type) {
    case 'LIST_USERS':
      return {
        ...state,
        users: action.users,
      };
    default:
      return state;
  }
};

export default listUsersReducer;
