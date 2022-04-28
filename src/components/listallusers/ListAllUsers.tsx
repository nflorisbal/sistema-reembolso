import { useEffect, useState } from 'react';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import {
  ContainerListUsers,
  DivColumnName,
  DivPagButtons,
  LineList,
} from './ListAllUsers.style';
import { RootState } from '../../store';
import { listAllUsers } from '../../store/actions/ListUsersActions';
import { switchRole } from '../../utils';
import { ContainerMain, ImgProfile, PageTitle } from '../../global.styles';
import DefaultProfileImg from '../../images/profile_default.png';
import Pagination from '../pagination/Pagination';

const ListAllUsers = (state: RootState & AnyAction) => {
  const { dispatch, users, token, pages } = state;
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    listAllUsers(dispatch, token, currentPage);
  }, [currentPage]);

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
            <ImgProfile
              src={
                user.image
                  ? `data:image/jpeg;base64, ${user.image}`
                  : DefaultProfileImg
              }
            />
            <DivColumnName>{user.name}</DivColumnName>
            <div>{user.email}</div>
            <div>{switchRole(user.idUser)}</div>
          </LineList>
        ))}
        <DivPagButtons>
          {pages > 1 && (
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={pages}
            />
          )}
        </DivPagButtons>
      </ContainerListUsers>
    </ContainerMain>
  );
};

const mapStateToProps = (state: RootState) => ({
  users: state.list.users,
  pages: state.list.totalPages,
  loading: state.list.loadingList,
  token: state.auth.token,
});

export default connect(mapStateToProps)(ListAllUsers);
