import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ContainerHeader, ContainerMenu } from './Header.style';
import { CredentialDTO } from '../../models/AuthDTO';
import { RootState } from '../../store';
import { handleLogout } from '../../store/actions/AuthActions';
import { hasToken } from '../../utils';
import Menu from '../menu/Menu';
import User from '../user/User';
import { ImageLogo } from '../logo/Logo.style';

const Header = ({ isLogged, dispatch }: CredentialDTO & AnyAction) => {
  const navigate = useNavigate();

  return (
    <>
      {(isLogged || hasToken()) && (
        <ContainerHeader>
          <ContainerMenu>
            <ImageLogo width="150px" />
            <Menu />
          </ContainerMenu>
          <ContainerMenu>
            <User />
            <button onClick={() => handleLogout(dispatch, navigate)}>
              Logout
            </button>
          </ContainerMenu>
        </ContainerHeader>
      )}
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  isLogged: state.authReducer.isLogged,
  image: state.authReducer.image,
});

export default connect(mapStateToProps)(Header);
