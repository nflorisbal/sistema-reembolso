import styled from 'styled-components';
import { Theme } from '../../theme';

export const ContainerLogin = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  background-color: ${Theme.color.neutralLight};
  border: 1px solid ${Theme.color.neutralDark};
  border-radius: 8px;
`;

export const DivLogin = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

export const LabelLogin = styled.label``;
