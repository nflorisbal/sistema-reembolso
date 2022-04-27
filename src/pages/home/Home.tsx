import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hasToken } from '../../utils';
import { ContainerMain, ContainerWelcome } from '../../global.styles';
import ListAllUsers from '../../components/listallusers/ListAllUsers';
import { RootState } from '../../store';
import { AnyAction } from 'redux';

const Home = (state: RootState & AnyAction) => {
  const navigate = useNavigate();
  const { roles, name } = state;

  useEffect(() => {
    if (!hasToken()) {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);

  return hasToken() ? (
    <ContainerMain>
      <ContainerWelcome>
        <h3>Olá, {name}!</h3>
      </ContainerWelcome>
      <ListAllUsers />
    </ContainerMain>
  ) : null;
};

const mapStateToProps = (state: RootState) => ({
  name: state.auth.name,
  roles: state.auth.roles,
});

export default connect(mapStateToProps)(Home);
