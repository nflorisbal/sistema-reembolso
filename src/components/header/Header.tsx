import { useEffect, useState } from 'react';
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

const Header = (state: CredentialDTO & AnyAction) => {
  console.log(state)
  console.log(state.image)
  const [hasImage, setHasImage] = useState(false)

  useEffect(()=>{
    {setTimeout(() =>{
      setHasImage(true);
    }, 5000)

  }},[state.image])

  return (
    <>
    {hasImage && 
    <img src={state.image} />}
    
      {/* {(isLogged || hasToken()) && (
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
      )} */}
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  isLogged: state.authReducer.isLogged,
  image: state.authReducer.image
});

export default connect(mapStateToProps)(Header);
