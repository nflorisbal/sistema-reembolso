import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { GoGear, GoLinkExternal } from 'react-icons/go';
import {
  ActionLink,
  UserActions,
  UserName,
  UserProfile,
} from './HeaderProfile.style';
import { CredentialDTO } from '../../models/AuthDTO';
import { RootState } from '../../store';
import { handleLogout } from '../../store/actions/AuthActions';
import { ImgProfile } from '../../global.styles';
import DefaultProfileImg from '../../images/profile_default.png';

const HeaderProfile = ({
  image,
  name,
  email,
  dispatch,
}: CredentialDTO & AnyAction) => {
  return (
    <>
      <UserProfile>
        <UserName>
          <strong>{name}</strong>
        </UserName>
        <small>{email}</small>
        <UserActions>
          <ActionLink to="/configuser">
            <GoGear /> Perfil
          </ActionLink>
          <ActionLink to="/login" onClick={() => handleLogout(dispatch)}>
            <GoLinkExternal /> Sair
          </ActionLink>
        </UserActions>
      </UserProfile>
      <ImgProfile
        src={image ? `data:image/jpeg;base64, ${image}` : DefaultProfileImg}
        alt="foto perfil"
      />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  image: state.auth.image,
  name: state.auth.name,
  email: state.auth.email,
});

export default connect(mapStateToProps)(HeaderProfile);
