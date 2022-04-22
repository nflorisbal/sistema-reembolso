import Logo from '../logo/Logo';
import Menu from '../menu/Menu';
import User from '../user/User';
import { ContainerHeader } from './Header.style';

const Header = () => {
  return (
    <ContainerHeader>
      <Logo />
      <Menu />
      <User />
    </ContainerHeader>
  );
};
export default Header;
