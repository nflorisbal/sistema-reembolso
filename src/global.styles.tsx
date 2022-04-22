import styled, { createGlobalStyle } from 'styled-components';
import { Theme } from './theme';
import { Link } from "react-router-dom"

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
  background-color: ${Theme.color.neutralPure};

  :focus {
    border: 1px solid ${Theme.color.highlightLight};
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
`;

export const GeneralDiv = styled.div``;

export const DivFlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

export const StyledLabel = styled.label``;

export const StyledForm = styled.form``;

export const DivFlexLink = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  position: relative;
`;

export const PageTitle = styled.h1``;

export const DivFlex = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`
export const LinkBack = styled(Link)`
  position: absolute;
  z-index: 0;
  top: 23px;
  left: 15px;
  text-decoration: none;
  font-size: 20px;
  color: black;
`;
