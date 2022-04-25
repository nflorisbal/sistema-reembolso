import styled from 'styled-components';
import { Theme } from '../../theme';

export const ContainerAddTicket = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${Theme.color.neutralLight};
  border: 1px solid ${Theme.color.neutralDark};
  border-radius: ${Theme.borderRadius};
  box-shadow: ${Theme.boxShadow};
  padding: ${Theme.padding};
  margin: ${Theme.margin};  
`;

export const DivFlexItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
`;

export const AnotherItem = styled.a`
    color: ${Theme.color.primaryDark};
    cursor: pointer;
    text-decoration: none;
`
