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

export const ContainerMain = styled.div<{ height?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  height: ${(props) => props.height || '100%'};
  position: relative;
`;

export const ContainerSmall = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 440px;
  padding: ${Theme.padding};
  background-color: ${Theme.color.neutralLight};
  border: 1px solid ${Theme.color.neutralDark};
  border-radius: ${Theme.borderRadius};
  box-shadow: ${Theme.boxShadow};
`;

export const ContainerWelcome = styled.div`
  min-width: 900px;
  margin: ${Theme.margin} 0;
  padding: ${Theme.padding};
  background-color: ${Theme.color.neutralLight};
  border: 1px solid ${Theme.color.neutralDark};
  border-radius: ${Theme.borderRadius};
  box-shadow: ${Theme.boxShadow};
`;

export const InputDefault = styled.input`
  border: 1px solid ${Theme.color.neutralDark};
  border-radius: ${Theme.borderRadius};
  outline: none;
  padding: 10px;
  min-height: 40px;
  background-color: ${Theme.color.neutralPure};

  :focus {
    border: 1px solid ${Theme.color.highlightLight};
  }

  ::-ms-reveal {
    display: none;
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
  outline: none;

  :hover {
    background-color: ${Theme.color.highlightDark};
  }
`;

export const DivFlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  height: 100px;
  width: 400px;
`;

export const DivFlexLink = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  position: relative;
`;

export const DivFlex = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

export const DivError = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: ${Theme.color.highlightPure};
  padding-left: 5px;
  margin-top: 5px;
`;

export const StyledLabel = styled.label``;

export const StyledForm = styled.form``;

export const PageTitle = styled.h2`
  padding: ${Theme.padding} 0;
`;

export const LinkBack = styled(Link)`
  position: absolute;
  z-index: 0;
  top: 15px;
  left: 15px;
  text-decoration: none;
  font-size: 20px;
  color:  ${Theme.color.neutralPure};
`;

export const ImgProfile = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 100%;
  border: 3px solid ${Theme.color.neutralLight};
  outline: 3px solid ${Theme.color.neutralDark};
`;
