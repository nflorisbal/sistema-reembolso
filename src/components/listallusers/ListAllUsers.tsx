import { listAllUsers } from '../../store/actions/ListUsersActions';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import { AnyAction } from 'redux';
import { ContainerMain, PageTitle } from '../../global.styles';
import { ContainerListUsers, ImgList, StyledTbody, StyledThead, Table, Td, Th, Tr } from './ListAllUsers.style';
import { switchRole } from '../../utils';

const ListAllUsers = (state: RootState & AnyAction) => {
  const { dispatch, users, loading, token } = state;

  useEffect(() => {
    if (users.length === 1) {
      listAllUsers(users, dispatch, token);
    }
  }, [users]);

  console.log(users)

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <ContainerMain>
      <ContainerListUsers>
        <PageTitle>Lista de usuários</PageTitle>
        <Table>
          <StyledThead>
          <Tr>
            <Th>Foto</Th>
            <Th>Nome</Th>
            <Th>Email</Th>
            <Th>Cargo</Th>
          </Tr>
          </StyledThead>
          <StyledTbody>
          {users.map((user: any) => (
            <Tr key={user.idUser}>
              <Td><ImgList src={user.image} /></Td>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{switchRole(user.idUser)}</Td>
            </Tr>
          ))}
          </StyledTbody>
        </Table>
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
