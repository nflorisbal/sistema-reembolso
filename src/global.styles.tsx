import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';
import { Theme } from './theme';
import Pattern from './images/pattern_bg.png';
import Notiflix from 'notiflix';

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
    filter: brightness(0.8);
  }
`;

export const ButtonAction = styled.button<{ color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: ${Theme.borderRadius};
  padding: 3px;
  margin-top: 5px;
  min-width: 70px;
  min-height: 20px;
  background-color: ${(props) => props.color};
  color: ${Theme.color.neutralLight};
  font-size: 12px;

  :hover:enabled {
    filter: brightness(0.9);
    cursor: pointer;
  }

  :disabled {
    background-color: ${Theme.color.neutralGrayLight};
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

export const LabelError = styled.label`
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
  color: ${Theme.color.neutralPure};
`;

export const ImgProfile = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 100%;
  border: 3px solid ${Theme.color.neutralLight};
  outline: 3px solid ${Theme.color.neutralDark};
`;

// global style  do notiflix
Notiflix.Loading.init({
  svgColor: Theme.color.primaryPure,
  backgroundColor: 'rgba(224, 224, 224, 0.5)',
});

Notiflix.Block.init({
  svgColor: Theme.color.primaryPure,
  backgroundColor: 'rgba(224, 224, 224, 0.5)',
});

Notiflix.Notify.init({
  fontFamily: 'Poppins',
  fontSize: `${Theme.defaultFontSize}`,
  position: 'center-top',
  distance: '125px',
  width: '300px',
  borderRadius: `${Theme.borderRadius}`,
  clickToClose: true,
  showOnlyTheLastOne: true,
  cssAnimationStyle: 'from-top',
  timeout: 3000,
});
