import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hasToken } from '../../utils';
import { ContainerMain } from '../../global.styles';
import ListAllUsers from '../../components/listallusers/ListAllUsers';
import { RootState } from '../../store';
import { CredentialDTO } from '../../models/AuthDTO';

const Home = (state?: CredentialDTO) => {
  const navigate = useNavigate();
  
  

  useEffect(() => {
    if (!hasToken()) {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);

  return hasToken() ? (
    <ContainerMain>
      <h1>Bem-vindo(a) ao sistema de reembolso!</h1>
        <ListAllUsers />
    </ContainerMain>
  ) : null;
};

const mapStateToProps = (state: RootState) => ({
  roles: state.auth.roles,
});

export default connect(mapStateToProps)(Home);
