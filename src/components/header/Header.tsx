import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { CredentialDTO } from '../../models/AuthDTO';
import { RootState } from '../../store';
import { handleLogout } from '../../store/actions/AuthActions';
import { hasToken } from '../../utils';
import Logo from '../logo/Logo';
import Menu from '../menu/Menu';
import User from '../user/User';
import { ContainerHeader } from './Header.style';

const Header = ({ user, dispatch }: CredentialDTO & AnyAction) => {
  return (
    <>
      {(user?.isLogged || hasToken()) && (
        <ContainerHeader>
          <div>
            <Logo />
            <Menu />
          </div>
          <div>
            <User />
            <button onClick={() => handleLogout(dispatch)}>Logout</button>
          </div>
        </ContainerHeader>
      )}
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  user: state.authReducer,
});

export default connect(mapStateToProps)(Header);
