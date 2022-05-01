import styled from 'styled-components';
import { Theme } from '../../theme';

export const ContainerAddTicket = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${Theme.color.neutralLight};
  border: 1px solid ${Theme.color.neutralDark};
  border-radius: ${Theme.borderRadius};
  box-shadow: ${Theme.boxShadow};
  padding: 0 ${Theme.padding};
  margin: ${Theme.margin};
  width: 440px;
`;

export const DivFlexItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const AnotherItem = styled.a`
  color: ${Theme.color.primaryDark};
  cursor: pointer;
  text-decoration: none;
`;
export const DivFlexItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px;
`;
