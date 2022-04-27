import { listAllUsers } from '../../store/actions/ListUsersActions';
import { useEffect, useState } from 'react';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import { ContainerMain, ImgProfile, PageTitle } from '../../global.styles';
import {
  ContainerListUsers,
  DivColumnName,
  DivPagButtons,
  LineList,
} from './ListAllUsers.style';
import { switchRole } from '../../utils';
import DefaultProfileImg from '../../images/profile_default.png';

const ListAllUsers = (state: RootState & AnyAction) => {
  const { dispatch, users, token } = state;
  const [ currentPage, setCurrentPage ] = useState(0);

  useEffect(() => {
    if (users.length === 1) {
      listAllUsers(users, dispatch, token, currentPage);
    }
  }, [users]);

  return (
    <ContainerMain>
      <ContainerListUsers>
        <PageTitle>Lista de usuários</PageTitle>
        <LineList>
          <p>Foto</p>
          <p>Nome</p>
          <p>E-mail</p>
          <p>Cargo</p>
        </LineList>
        {users.content?.map((user: any) => (
          <LineList key={user.idUser}>
            <ImgProfile src={user.image ? user.image : DefaultProfileImg} />
            <DivColumnName>{user.name}</DivColumnName>
            <div>{user.email}</div>
            <div>{switchRole(user.idUser)}</div>
          </LineList>
        ))}
        <DivPagButtons>
          {/* inserir logica para paginação */}
          <button onClick={() => listAllUsers(users, dispatch, token, currentPage)}>
            Anterior
          </button>
          <button onClick={() => listAllUsers(users, dispatch, token, currentPage)}>
            Próxima
          </button>
        </DivPagButtons>
      </ContainerListUsers>
    </ContainerMain>
  );
};

const mapStateToProps = (state: RootState) => ({
  users: state.list.users,
  loading: state.list.loading,
  token: state.auth.token,
});

export default connect(mapStateToProps)(ListAllUsers);
