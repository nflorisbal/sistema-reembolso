import styled from 'styled-components';
import { Theme } from '../../theme';

export const ContainerAddTicket = styled.div`
  width: 440px;
  min-height: 700px;
  height: auto !important;
  background-color: ${Theme.color.neutralLight};
  border: 1px solid ${Theme.color.neutralDark};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: center;
  margin: 20px;
  align-items: center;
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
