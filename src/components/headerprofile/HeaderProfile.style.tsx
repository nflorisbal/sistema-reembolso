import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Theme } from '../../theme';

export const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
  text-align: right;
  margin: ${Theme.margin};
`;

export const UserName = styled.p`
  text-transform: capitalize;
`;

export const UserActions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const ActionLink = styled(Link)`
  display: flex;

  text-decoration: none;
  padding-left: 10px;

  :hover {
    text-decoration: underline;
  }
`;

export const DivIcons = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
  justify-content: center;
`;
