import styled from 'styled-components';
import { Theme } from '../../theme';

export const ContainerListUsers = styled.div`
  background-color: ${Theme.color.neutralLight};
  padding: ${Theme.padding};
  border-radius: ${Theme.borderRadius};
  box-shadow: ${Theme.boxShadow};
  min-width: 900px;
`;

export const LineList = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr 1.5fr 0.5fr;
  align-content: center;
  align-items: center;
  border-bottom: 1px solid ${Theme.color.neutralDark};
  font-size: 12px;
  padding: 10px;

  &#header {
    font-weight: bold;
  }
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
