import styled from 'styled-components';
import { Theme } from '../../theme';

export const ImgProfile = styled.img`
  border-radius: 100%;
  border: 3px solid ${Theme.color.neutralLight};
  outline: 3px solid ${Theme.color.neutralDark};
  width: 50px;
  height: 50px;
`;

export const InfoProfile = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
  margin: ${Theme.margin};
`
