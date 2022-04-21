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

  #root{
    display: flex;
    justify-content: center;
  }
`;

export const ContainerMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1100px;
  height: 100vh;
`;

export const InputDefault = styled.input`
  border: 1px solid ${Theme.color.neutralDark};
  border-radius: 8px;
  padding: 10px;
`

export const ButtonDefault = styled.button`
  border: none;
  border-radius: 8px;
  height: 40px;
  width: 150px;
  font-size: ${Theme.defaultFontSize};
  color: ${Theme.color.neutralLight};
  background-color: ${Theme.color.highlightPure};

  :hover {
    opacity: 0.8;
  }




`;

export const GeneralDiv = styled.div`
    
`