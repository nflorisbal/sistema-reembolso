import styled from 'styled-components';
import ImgLogo from '../../images/logo_azul.png';

export const ImageLogo = styled.img.attrs({
  src: `${ImgLogo}`,
})`
  width: ${(props) => props.width || '200px'};
  margin: 20px 0;
`;
