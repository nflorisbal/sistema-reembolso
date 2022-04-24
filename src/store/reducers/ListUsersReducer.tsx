import { AnyAction } from 'redux';
import { ListUsersDTO } from '../../models/ListUsersDTO';

export const INITIAL_STATE_LIST_USERS = {
  users: [{
    name: '',
    idUser: 0,
    image: '',
    email: '',
    roleEntities: [
      {
        idRole: 0,
      },
    ],
  }],
};

const listUsersReducer = (
  state: ListUsersDTO = INITIAL_STATE_LIST_USERS,
  action: AnyAction
) => {
  console.log(action, "ação dentro do reducer")
  console.log(state, "dentro do reducer")
  switch (action.type) {
    case 'LIST_USERS':
      return {
        ...state,
        name: action.users.name,
        idUser: action.users.idUser,
        image: action.users.image,
        email: action.users.email,
        roleEntities: [
          {
            idRole: action.users.idRole,
          },
        ],
      };
    default:
      return state;
  }
};

export default listUsersReducer;
