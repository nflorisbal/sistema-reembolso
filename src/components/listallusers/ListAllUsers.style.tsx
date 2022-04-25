import styled from 'styled-components';
import { Theme } from '../../theme';

export const ContainerListUsers = styled.div``;
export const Table = styled.table`
  width: 100%;
  padding: 20px;
`;
export const Tr = styled.tr`
  color: blue;
`;

export const Th = styled.th`
  color: rgba(159, 162, 180, 1);
  text-align: left;
  width: 100px;
  padding: 10px;
  font-size: 14px;
  font-weight: 700px;
  border-bottom: 1px solid rgba(223, 224, 235, 1);
`;
export const Td = styled.td`
  color: rgba(37, 39, 51, 1);
  width: 300px;
  padding: 10px;
  font-weight: 600px;
  border-bottom: 1px solid rgba(223, 224, 235, 1);
  height: 50px;
`;
export const TdNome = styled.td`
  width: 350px;
  padding: 10px;
  color: rgba(37, 39, 51, 1);
  font-weight: 600px;
  border-bottom: 1px solid rgba(223, 224, 235, 1);
  height: 50px;
`;
export const StyledThead = styled.thead``;
export const StyledTbody = styled.tbody``;

export const ImgList = styled.img`
  width: 50px;
  border-radius: 100%;
  border: 3px solid ${Theme.color.neutralLight};
  outline: 3px solid ${Theme.color.neutralDark};
`;
