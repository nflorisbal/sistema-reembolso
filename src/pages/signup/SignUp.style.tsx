import styled from 'styled-components';
import { Theme } from '../../theme';
import { AiOutlineEye } from 'react-icons/ai';
import { Link } from "react-router-dom"

export const LinkEyePassword = styled.a`
  position: absolute;
  z-index: 0;
  top: 44px;
  right: 25px;
  text-decoration: none;
`;

export const LinkBack = styled(Link)`
  position: absolute;
  z-index: 0;
  top: 23px;
  left: 15px;
  text-decoration: none;
  font-size: 20px;
  color: black;
`;

export const LinkEyeConfirmPassword = styled.a`
  position: absolute;
  z-index: 0;
  top: 44px;
  right: 25px;
  text-decoration: none;
`;

export const ContainerSignUp = styled.div`
  width: 440px;
  height: 650px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${Theme.color.neutralLight};
  border: 1px solid ${Theme.color.neutralDark};
  border-radius: 8px;
  * > {
    padding: 10px;
  }
  position: relative;
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


