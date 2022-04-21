import styled from 'styled-components';
import { Theme } from '../../theme';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export const LinkEyePassword = styled.a`
  position: absolute;
  z-index: 0;
  top: 44px;
  right: 25px;
  text-decoration: none;
`;

export const LinkEyeConfirmPassword = styled.a`
  position: absolute;
  z-index: 0;
  top: 375px;
  right: 620px;
  text-decoration: none;
`;

export const ContainerSignUp = styled.div`
  width: 440px;
  height: 650px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Theme.color.neutralLight};
  border: 1px solid ${Theme.color.neutralDark};
  border-radius: 8px;
  * > {
    padding: 10px;
  }
`;

export const DivButton = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledSelect = styled.select`
  border: 1px solid ${Theme.color.neutralDark};
  border-radius: 8px;
  padding: 10px;
`;

export const StyledAiOutlineEye = styled(AiOutlineEye)``;
export const StyledAiOutlineEyeInvisible = styled(AiOutlineEye)``;
