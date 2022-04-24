import styled from 'styled-components';
import { Theme } from '../../theme';

export const ContainerHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${Theme.padding};
  width: 100%;
  height: 100px;
  background-color: ${Theme.color.neutralLight};
`;

export const ContainerMenu = styled.div`
  display: flex;
  align-items: center;
`;
