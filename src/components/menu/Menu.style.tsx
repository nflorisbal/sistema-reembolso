import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Theme } from '../../theme';

export const ContainerNavbar = styled.nav`
  padding: ${Theme.padding};
`;

export const LinkMenu = styled(Link)`
  padding: ${Theme.padding};
  text-decoration: none;
  transition: background-color 0.3s;

  :hover {
    background-color: ${Theme.color.neutralPure};
  }
`;
