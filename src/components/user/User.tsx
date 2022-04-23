import { connect } from 'react-redux';
import { CredentialDTO } from '../../models/AuthDTO';
import { RootState } from '../../store';

const User = (state?: CredentialDTO) => {
  console.log(state);
  
  return (
    <>
      <img src={state?.image} />
      <p>{state?.name}</p>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  name: state.authReducer.name,
  image: state.authReducer.image,
});

export default connect(mapStateToProps)(User);
