import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ContainerHeader, ContainerMenu } from './Header.style';
import { CredentialDTO } from '../../models/AuthDTO';
import { RootState } from '../../store';
import { handleLogout } from '../../store/actions/AuthActions';
import Menu from '../menu/Menu';
import User from '../user/User';
import { ImageLogo } from '../logo/Logo.style';
import { ButtonDefault } from '../../global.styles';

const Header = ({ isLogged, dispatch }: CredentialDTO & AnyAction) => {
  const navigate = useNavigate();

  return (
    <>
      {isLogged ? (
        <ContainerHeader>
          <ContainerMenu>
            <ImageLogo width="150px" />
            <Menu />
          </ContainerMenu>
          <ContainerMenu>
            <User />
            <ButtonDefault onClick={() => handleLogout(dispatch, navigate)}>
              Logout
            </ButtonDefault>
          </ContainerMenu>
        </ContainerHeader>
      ) : null}
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  isLogged: state.authReducer.isLogged,
});

export default connect(mapStateToProps)(Header);
