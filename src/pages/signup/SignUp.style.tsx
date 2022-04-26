import styled from 'styled-components';
import { Theme } from '../../theme';
import { AiOutlineEye } from 'react-icons/ai';
import { ContainerSmall } from '../../global.styles';

export const LinkEyePassword = styled.a`
  position: absolute;
  right: 20px;
  top: 45px;
  font-size: 20px;
  outline: none;
`;

export const ContainerSignUp = styled(ContainerSmall)`
  margin-bottom: 50px;
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
