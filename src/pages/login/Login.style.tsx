import styled from 'styled-components';
import { Theme } from '../../theme';

export const ContainerLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 440px;
  min-height: 530px;
  padding: 20px;
  background-color: ${Theme.color.neutralLight};
  border: 1px solid ${Theme.color.neutralDark};
  border-radius: 8px;
  box-shadow: 0 1px 6px rgb(32 33 36 / 28%);
`;

export const Title = styled.h4`
  text-align: center;
  padding: 20px 0;
`;

export const DivInputLogin = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;
  height: 100px;
  margin-bottom: 20px;

  :last-child {
    flex-direction: row;
    height: fit-content;
  }
`;

export const DivBtnLogin = styled.div`
  display: flex;
  justify-content: center;

  :last-child {
    padding: 20px 0;
  }
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
