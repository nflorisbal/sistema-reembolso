import { useEffect, useState } from 'react';
import { hasToken } from '../../utils';
import Logo from '../logo/Logo';
import Menu from '../menu/Menu';
import User from '../user/User';
import { ContainerHeader } from './Header.style';

const Header = () => {
  const [token, setToken] = useState(false);

  useEffect(() => {
    if (hasToken()) {
      setToken(true);
    }
  }, []);

  return (
    token && (
      <ContainerHeader>
        <div>
          <Logo />
          <Menu />
        </div>
        <User />
      </ContainerHeader>
    )
  );
};
export default Header;
