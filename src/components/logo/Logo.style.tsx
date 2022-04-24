import styled from 'styled-components';
import ImgLogo from '../../images/logo_azul.png';
import { Theme } from '../../theme';

export const ImageLogo = styled.img.attrs({
  src: `${ImgLogo}`,
  alt: 'logo dbc',
})`
  width: ${(props) => props.width || '200px'};
  padding-right: ${Theme.margin};
  border-right: 1px solid ${Theme.color.neutralPure};
`;
