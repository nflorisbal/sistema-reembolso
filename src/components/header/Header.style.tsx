import styled from 'styled-components';
import { Theme } from '../../theme';
import {} from '../../images/pattern_header.png'

export const ContainerHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100px;
  background-color: ${Theme.color.primaryPure};
`;
