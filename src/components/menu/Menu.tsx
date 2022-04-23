import { ContainerNavbar, LinkMenu } from './Menu.style';

const Menu = () => {
  return (
    <ContainerNavbar>
      <LinkMenu to="/">Home</LinkMenu>
      <LinkMenu to="/addticket">Tickets</LinkMenu>
      <LinkMenu to="/signup">Usuários</LinkMenu>
    </ContainerNavbar>
  );
};
export default Menu;
