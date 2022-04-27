import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { CredentialDTO } from '../../models/AuthDTO';
import { RootState } from '../../store';
import { ContainerNavbar, LinkMenu } from './Menu.style';

const Menu = ({ roles }: CredentialDTO & AnyAction) => {
  const userRole = roles[0]?.role;

  return (
    <ContainerNavbar>
      <LinkMenu to="/">Home</LinkMenu>
      {userRole === 'ROLE_COLABORADOR' && (
        <LinkMenu to="/addticket">Tickets</LinkMenu>
      )}
      {userRole === 'ROLE_ADMIN' && <LinkMenu to="/signup">Usuários</LinkMenu>}
    </ContainerNavbar>
  );
};

const mapStateToProps = (state: RootState) => ({
  roles: state.auth.roles,
});

export default connect(mapStateToProps)(Menu);
