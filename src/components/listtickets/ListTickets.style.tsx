import styled from 'styled-components';
import { InputDefault } from '../../global.styles';
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

export const ContainerFind = styled.div`
  padding-bottom: ${Theme.padding};
`;

export const InputFind = styled(InputDefault)`
  width: 100%;
`;

export const DivTicket = styled.div`
  margin-bottom: ${Theme.margin};
`;

export const DivItem = styled.div``;

export const LineTicket = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 0.4fr) 0.3fr 0.5fr 0.2fr;
  align-content: center;
  align-items: center;
  border-top: 1px solid ${Theme.color.neutralDark};
  padding: 10px 0 10px 10px;

  &.header {
    font-weight: bold;
    background-color: ${Theme.color.neutralPure};
  }
`;

export const LineItem = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 0.4fr) 0.3fr 0.5fr 0.2fr;
  align-content: center;
  align-items: center;
  align-content: center;
  align-items: center;
  padding-left: 10px;

  &.header {
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

export const StatusTicket = styled.p`
  color: ${({ color }) => color};
  font-weight: bold;
`;

export const LinkItem = styled.a`

`;