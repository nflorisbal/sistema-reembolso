import styled from 'styled-components';
import { Theme } from '../../theme';

export const ContainerLogin = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  background-color: ${Theme.color.neutralLight};

  // borda pra visualizar o container (remover depois)
  border: 1px solid #000;
`;

export const DivInput = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LabelLogin = styled.label``;
