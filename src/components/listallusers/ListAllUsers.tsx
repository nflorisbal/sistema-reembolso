import { useEffect, useState } from 'react';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { Block } from 'notiflix';
import {
  ContainerFind,
  ContainerListUsers,
  DivColumnName,
  DivPagButtons,
  InputFind,
  LineList,
} from './ListAllUsers.style';
import { RootState } from '../../store';
import {
  listAllUsers,
  listUsersByName,
} from '../../store/actions/ListUsersActions';
import { switchRole } from '../../utils';
import {
  ButtonAction,
  ContainerMain,
  ImgProfile,
  PageTitle,
} from '../../global.styles';
import DefaultProfileImg from '../../images/profile_default.png';
import Pagination from '../pagination/Pagination';
import { Theme } from '../../theme';
import { useNavigate } from 'react-router-dom';

const MIN_LENGTH = 2;

const ListAllUsers = (state: RootState & AnyAction) => {
  const { dispatch, users, token, totalPages } = state;
  const [currentPage, setCurrentPage] = useState<number>(0);
  const navigate = useNavigate();

  const handleSearch = (value: string) => {
    if (value === '') {
      Block.circle('.listUser');
      listAllUsers(dispatch, token, currentPage);
    } else if (value.length > MIN_LENGTH) {
      Block.circle('.listUser');
      listUsersByName(dispatch, token, value);
    }
  };

  useEffect(() => {
    Block.circle('.listUser');
    listAllUsers(dispatch, token, currentPage);
    // eslint-disable-next-line
  }, [currentPage]);

  return (
    <ContainerMain>
      <ContainerListUsers className="listUser">
        <PageTitle>Lista de usuários</PageTitle>
        <ContainerFind>
          <InputFind
            name="find"
            placeholder="Buscar usuário por nome"
            onChange={(event) => handleSearch(event.target.value)}
          />
        </ContainerFind>
        <LineList id="header">
          <p>Foto</p>
          <p>Nome</p>
          <p>E-mail</p>
          <p>Cargo</p>
          <p>Ações</p>
        </LineList>
        {users?.map((user: any) => (
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
            <div>{switchRole(user.roleEntities[0].idRole)}</div>
            <ButtonAction
              color={Theme.color.primaryDark}
              onClick={() => navigate(`/updateuser/${user.idUser}`)}
            >
              Editar
            </ButtonAction>
          </LineList>
        ))}
        <DivPagButtons>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </DivPagButtons>
      </ContainerListUsers>
    </ContainerMain>
  );
};

const mapStateToProps = (state: RootState) => ({
  users: state.list.users,
  totalPages: state.list.totalPages,
  loading: state.list.loadingList,
  token: state.auth.token,
});

export default connect(mapStateToProps)(ListAllUsers);
