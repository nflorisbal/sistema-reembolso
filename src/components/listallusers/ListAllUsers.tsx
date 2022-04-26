import { listAllUsers } from '../../store/actions/ListUsersActions';
import { useEffect } from 'react';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { Loading } from 'notiflix';
import { RootState } from '../../store';
import { ContainerMain, PageTitle } from '../../global.styles';
import {
  ContainerListUsers,
  ImgList,
  StyledTbody,
  StyledThead,
  Table,
  Td,
  Th,
  Tr,
  ThImage,
  TdImage,
  TdNome,
} from './ListAllUsers.style';
import { switchRole } from '../../utils';
import DefaultProfileImg from '../../images/profile_default.png';

const ListAllUsers = (state: RootState & AnyAction) => {
  const { dispatch, users, loading, token } = state;

  useEffect(() => {
    if (users.length === 1) {
      listAllUsers(users, dispatch, token);
    }
  }, [users]);

  if (loading) {
    // return <>{Loading.arrows()}</>;
  }

  return (
    <ContainerMain>
      <ContainerListUsers>
        <PageTitle>Lista de usuários</PageTitle>
        <Table>
          <StyledThead>
            <Tr>
              <ThImage>Foto</ThImage>
              <Th>Nome</Th>
              <Th>Email</Th>
              <Th>Cargo</Th>
            </Tr>
          </StyledThead>
          <StyledTbody>
            {users.content?.map((user: any) => (
              <Tr key={user.idUser}>
                <TdImage>
                  <ImgList src={user.image ? user.image : DefaultProfileImg} />
                </TdImage>
                <TdNome>{user.name}</TdNome>
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
