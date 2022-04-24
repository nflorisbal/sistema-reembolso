import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';
import { Theme } from './theme';
import Pattern from './images/pattern_bg.png';

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
    background: url(${Pattern}) ${Theme.color.primaryPure};
  }

  a {
    color: ${Theme.color.highlightPure}
  }
`;

export const ContainerMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const InputDefault = styled.input`
  border: 1px solid ${Theme.color.neutralDark};
  border-radius: ${Theme.borderRadius};
  outline: none;
  padding: 10px;
  background-color: ${Theme.color.neutralPure};

  :focus {
    border: 1px solid ${Theme.color.highlightLight};
  }
`;

export const ButtonDefault = styled.button`
  border: none;
  border-radius: ${Theme.borderRadius};
  height: 40px;
  width: 150px;
  font-size: ${Theme.defaultFontSize};
  color: ${Theme.color.neutralLight};
  background-color: ${Theme.color.highlightPure};

  :hover {
    background-color: ${Theme.color.highlightLight};
  }
`;

export const GeneralDiv = styled.div``;

export const DivFlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  height: 100px;
  width: 400px;
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
`;
export const LinkBack = styled(Link)`
  /* position: absolute; */
  z-index: 0;
  top: 23px;
  left: 15px;
  text-decoration: none;
  font-size: 20px;
  color: black;
`;

export const DivError = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: ${Theme.color.highlightPure};
  padding-left: 5px;
  margin-top: 5px;
`;
