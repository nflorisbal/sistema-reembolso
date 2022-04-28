import styled from 'styled-components';
import { Theme } from '../../theme';

export const PageButton = styled.button`
  border: none;
  background: none;
  font-size: ${Theme.defaultFontSize};
  color: ${Theme.color.primaryDark};
  cursor: pointer;

  :disabled {
    color: ${Theme.color.neutralGrayLight};
    cursor: not-allowed;
  }
`;
