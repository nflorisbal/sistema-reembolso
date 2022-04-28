import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AnyAction } from 'redux';
import { CredentialDTO } from '../../models/AuthDTO';
import { RootState } from '../../store';
import { handleLogout } from '../../store/actions/AuthActions';
import { InfoName, InfoProfile } from './User.style';
import { ImgProfile } from '../../global.styles';
import DefaultProfileImg from '../../images/profile_default.png';

const User = ({ image, name, email, dispatch }: CredentialDTO & AnyAction) => {
  const navigate = useNavigate();

  return (
    <>
      <InfoProfile>
        <InfoName>
          <strong>{name}</strong>
        </InfoName>
        <small>{email}</small>
        <a href="#" onClick={() => handleLogout(dispatch, navigate)}>
          Sair
        </a>
      </InfoProfile>
      <ImgProfile
        src={
          image
            ? `data:image/jpeg;base64, ${image}`
            : DefaultProfileImg
        }
      />
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  image: state.auth.image,
  name: state.auth.name,
  email: state.auth.email,
});

export default connect(mapStateToProps)(User);
