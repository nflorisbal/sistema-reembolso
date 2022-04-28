import styled from 'styled-components';
import { Theme } from '../../theme';

export const ContainerListTicket = styled.div`
  background-color: ${Theme.color.neutralLight};
  padding: ${Theme.padding};
  margin-top: ${Theme.margin};
  border-radius: ${Theme.borderRadius};
  box-shadow: ${Theme.boxShadow};
  min-width: 900px;
  font-size: 12px;
`;

export const DivTicket = styled.div`
  margin-bottom: ${Theme.margin};
`;

export const LineTicket = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 0.5fr) repeat(2, 0.2fr);
  align-content: center;
  align-items: center;
  border-top: 1px solid ${Theme.color.neutralDark};
  padding: 10px;

  &#header {
    font-weight: bold;
  }
`;

export const LineItem = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 0.5fr) repeat(2, 0.2fr);
  align-content: center;
  align-items: center;
  align-content: center;
  align-items: center;
  padding-left: 10px;
`;

export const DivColumnName = styled.div`
  text-transform: capitalize;
`;

export const DivPagButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: ${Theme.padding};
`;
