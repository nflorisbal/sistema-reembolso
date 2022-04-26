import { listAllUsers } from '../../store/actions/ListUsersActions';
import { useEffect } from 'react';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import { ContainerMain, PageTitle } from '../../global.styles';
import { ContainerListUsers, ImgList, LineList } from './ListAllUsers.style';
import { switchRole } from '../../utils';
import DefaultProfileImg from '../../images/profile_default.png';

const ListAllUsers = (state: RootState & AnyAction) => {
  const { dispatch, users, loading, token } = state;

  useEffect(() => {
    if (users.length === 1) {
      listAllUsers(users, dispatch, token);
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
            <ImgList src={user.image ? user.image : DefaultProfileImg} />
            <div>{user.name}</div>
            <div>{user.email}</div>
            <div>{switchRole(user.idUser)}</div>
          </LineList>
        ))}
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
