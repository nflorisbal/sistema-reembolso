import styled from 'styled-components';
import { Theme } from '../../theme';

export const ContainerLogin = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  height: fit-content;
  padding: 20px;
  background-color: ${Theme.color.neutralLight};
  border: 1px solid ${Theme.color.neutralDark};
  border-radius: 8px;
`;

export const Title = styled.h4`
  text-align: center;
  padding: 20px 0;
`

export const DivFormLogin = styled.div`
  display: flex;
  flex-direction: column;
  height: 90px;
  padding: 10px 0;
`;

export const LabelLogin = styled.label`
  font-size: ${Theme.defaultFontSize};
`;

export const LabelError = styled.label`
  font-size: 12px;
  font-weight: bold;
  color: ${Theme.color.highlightPure}
`
