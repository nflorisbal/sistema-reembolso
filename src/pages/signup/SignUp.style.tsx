import styled from 'styled-components';
import { Theme } from '../../theme';
import { AiOutlineEye } from 'react-icons/ai';


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
  top: 44px;
  right: 25px;
  text-decoration: none;
`;

export const ContainerSignUp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 440px;
  padding: ${Theme.padding};
  margin-top: calc(25vh - 100px);
  margin-bottom: 50px;
  background-color: ${Theme.color.neutralLight};
  border: 1px solid ${Theme.color.neutralDark};
  border-radius: ${Theme.borderRadius};
  box-shadow: ${Theme.boxShadow};
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


