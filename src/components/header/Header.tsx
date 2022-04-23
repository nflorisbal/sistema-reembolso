import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AnyAction } from 'redux';
import { CredentialDTO } from '../../models/AuthDTO';
import { RootState } from '../../store';
import { handleLogout } from '../../store/actions/AuthActions';
import { hasToken } from '../../utils';
import Logo from '../logo/Logo';
import Menu from '../menu/Menu';
import User from '../user/User';
import { ContainerHeader } from './Header.style';

const Header = ({ isLogged, dispatch }: CredentialDTO & AnyAction) => {
  const navigate = useNavigate();
  
  return (
    <>
      {(isLogged || hasToken()) && (
        <ContainerHeader>
          <div>
            <Logo />
            <Menu />
          </div>
          <div>
            <User />
            <button onClick={() => handleLogout(dispatch, navigate)}>Logout</button>
          </div>
        </ContainerHeader>
      )}
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  isLogged: state.authReducer.isLogged,
});

export default connect(mapStateToProps)(Header);
