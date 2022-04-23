import { connect } from 'react-redux';
import { CredentialDTO } from '../../models/AuthDTO';
import { RootState } from '../../store';
import { ImgProfile } from './User.style';

const User = (state?: CredentialDTO) => {  
  return (
    <>
      <ImgProfile src={state?.image} alt=''/>
      <p>{state?.name}</p>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  name: state.authReducer.name,
  image: state.authReducer.image,
});

export default connect(mapStateToProps)(User);
