import styled from 'styled-components';
import { ContainerSmall } from '../../global.styles';
import { Theme } from '../../theme';

export const ContainerLogin = styled(ContainerSmall)`
  margin-top: 25vh;
`;

export const Title = styled.h4`
  text-align: center;
  padding: ${Theme.padding} 0;
`;

export const DivInputLogin = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;
  height: 90px;
  margin-bottom: 20px;

  :last-child {
    flex-direction: row;
    height: fit-content;
  }
`;

export const DivBtnLogin = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;

  :last-child {
    padding: 20px 0;
    margin: 0;
  }
`;

export const DivServerError = styled.div`
  display: flex;
  justify-content: center;
`;

export const DivShowPassword = styled.div`
  padding: 3px 0 0 5px;
`;

export const LabelLogin = styled.label`
  font-size: ${Theme.defaultFontSize};
  margin-bottom: 5px;
  padding-left: 5px;
`;

export const LabelError = styled.label`
  font-size: 12px;
  font-weight: bold;
  color: ${Theme.color.highlightPure};
  padding-left: 5px;
  margin-top: 5px;
`;

export const TextNewUser = styled.p`
  padding-right: 5px;
`;
