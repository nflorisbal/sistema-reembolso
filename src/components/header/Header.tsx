import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { ContainerHeader, ContainerMenu } from './Header.style';
import { CredentialDTO } from '../../models/AuthDTO';
import { RootState } from '../../store';
import Menu from '../menu/Menu';
import HeaderProfile from '../headerprofile/HeaderProfile';
import { ImageLogo } from '../logo/Logo.style';
import { Link } from 'react-router-dom';

const Header = ({ isLogged }: CredentialDTO & AnyAction) => {
  return (
    <>
      {isLogged ? (
        <ContainerHeader>
          <ContainerMenu>
            <Link to="/"><ImageLogo width="170px" /></Link>
            <Menu />
          </ContainerMenu>
          <ContainerMenu>
            <HeaderProfile />
          </ContainerMenu>
        </ContainerHeader>
      ) : null}
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  isLogged: state.auth.isLogged,
});

export default connect(mapStateToProps)(Header);
