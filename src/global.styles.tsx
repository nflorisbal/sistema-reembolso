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
    align-items: center;
    min-height: 100vh;
    min-width: 100vh;
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
  outline: none;
  padding: 10px;

  :hover, :focus {
    box-shadow: 0 1px 6px rgb(32 33 36 / 28%)
  }
`;

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
<<<<<<< HEAD
=======


>>>>>>> 5a9bb37ef76f9d51dab92f1f8e53d8f259889a19
`;

export const GeneralDiv = styled.div`
    
`

export const DivFlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
`

export const StyledLabel = styled.label`
    
`

export const StyledForm = styled.form`
    
`

export const DivFlexLink = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    position: relative
`