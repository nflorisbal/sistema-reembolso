import styled from 'styled-components';
import { Theme } from '../../theme';

export const ContainerListUsers = styled.div`
  background-color: ${Theme.color.neutralLight};
  padding: ${Theme.padding};
  border-radius: ${Theme.borderRadius};
  min-width: 900px;
`;

export const ImgList = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 100%;
  border: 3px solid ${Theme.color.neutralLight};
  outline: 3px solid ${Theme.color.neutralDark};
`;

export const LineList = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr 1.5fr 0.5fr;
  align-content: center;
  align-items: center;
  border-bottom: 1px solid #dfe0eb;
  font-size: 12px;
  padding: 10px;
  :last-child {
    border: none;
  }
  p {
    font-weight: bold;
  }
`;
