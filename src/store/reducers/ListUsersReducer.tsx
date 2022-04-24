import { AnyAction } from 'redux';
import { ListUsersDTO } from '../../models/ListUsersDTO';

export const INITIAL_STATE_LIST_USERS = {
  user: {
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
};

const listUsersReducer = (
  state: ListUsersDTO = INITIAL_STATE_LIST_USERS,
  action: AnyAction
) => {
  console.log(state, "dentro do reducer")
  switch (action.type) {
    case 'LIST_USERS':
      return {
        ...state,
        name: action.name,
        idUser: action.idUser,
        image: action.image,
        email: action.email,
        roleEntities: [
          {
            idRole: action.idRole,
          },
        ],
      };
    default:
      return state;
  }
};

export default listUsersReducer;
