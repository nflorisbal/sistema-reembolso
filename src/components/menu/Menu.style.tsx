import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Theme } from '../../theme';

export const ContainerNavbar = styled.nav`
  padding: ${Theme.padding};
`;

export const LinkMenu = styled(Link)`
  padding-left: ${Theme.padding};
`;
