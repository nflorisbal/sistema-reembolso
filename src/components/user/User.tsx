import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AnyAction } from 'redux';
import { CredentialDTO } from '../../models/AuthDTO';
import { RootState } from '../../store';
import { handleLogout } from '../../store/actions/AuthActions';
import { ImgProfile, InfoProfile } from './User.style';

const User = ({ image, name, email, dispatch }: CredentialDTO & AnyAction) => {
  const navigate = useNavigate();

  return (
    <>
      <ImgProfile src={image} alt="" />
      <InfoProfile>
        <p>
          <strong>{name}</strong>
        </p>
        <small>{email}</small>
        <a href="#" onClick={() => handleLogout(dispatch, navigate)}>
          Sair
        </a>
      </InfoProfile>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  image: state.auth.image,
  name: state.auth.name,
  email: state.auth.email,
});

export default connect(mapStateToProps)(User);
