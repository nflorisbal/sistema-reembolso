import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ContainerHeader, ContainerMenu } from './Header.style';
import { CredentialDTO } from '../../models/AuthDTO';
import { RootState } from '../../store';
import Menu from '../menu/Menu';
import User from '../user/User';
import { ImageLogo } from '../logo/Logo.style';

const Header = ({ isLogged, dispatch }: CredentialDTO & AnyAction) => {
  const navigate = useNavigate();

  return (
    <>
      {isLogged ? (
        <ContainerHeader>
          <ContainerMenu>
            <ImageLogo width="170px" />
            <Menu />
          </ContainerMenu>
          <ContainerMenu>
            <User />
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
