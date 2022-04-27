import { listAllUsers } from '../../store/actions/ListUsersActions';
import { useEffect } from 'react';
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

  useEffect(() => {
    if (users.length === 0) {
      listAllUsers(dispatch, token);
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
        {users.map((user: any) => (
          <LineList key={user.idUser}>
            <ImgProfile src={user.image ? user.image : DefaultProfileImg} />
            <DivColumnName>{user.name}</DivColumnName>
            <div>{user.email}</div>
            <div>{switchRole(user.idUser)}</div>
          </LineList>
        ))}
        <DivPagButtons>
          {/* inserir logica para paginação */}
          <button onClick={() => listAllUsers(dispatch, token)}>
            Anterior
          </button>
          <button onClick={() => listAllUsers(dispatch, token)}>Próxima</button>
        </DivPagButtons>
      </ContainerListUsers>
    </ContainerMain>
  );
};

const mapStateToProps = (state: RootState) => ({
  users: state.list.users,
  loading: state.list.loadingList,
  token: state.auth.token,
});

export default connect(mapStateToProps)(ListAllUsers);
