import styled, { createGlobalStyle } from 'styled-components';
import { Theme } from './theme';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }

  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${Theme.color.neutralPure};
  }
`;

export const ContainerMain = styled.div`
  display: flex;
  flex-direction: column;
  width: 1100px;
  height: 100vh;
`;
