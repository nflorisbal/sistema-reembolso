import { useEffect, useState } from 'react';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { Block } from 'notiflix';
import { RootState } from '../../store';
import { listTickets } from '../../store/actions/ListTicketsActions';
import {
  ContainerListTicket,
  DivItem,
  DivPagButtons,
  DivTicket,
  LineItem,
  LineTicket,
} from './ListTickets.style';
import Pagination from '../pagination/Pagination';
import { ButtonAction, ContainerMain, PageTitle } from '../../global.styles';

const ListTickets = (state: RootState & AnyAction) => {
  const { ticketsList, dispatch, token, roles, pages } = state;
  const [currentPage, setCurrentPage] = useState<number>(0);
  const userRole = roles[0]?.role;

  useEffect(() => {
    Block.circle('.listTickets');
    listTickets(dispatch, token, currentPage);
  }, [currentPage]);

  return (
    <ContainerMain>
      <ContainerListTicket className="listTickets">
        <PageTitle>Tickets</PageTitle>
        <LineTicket id="header">
          <p>Usuário</p>
          <p>Título</p>
          <p>Solicitado em</p>
          <p>Total</p>
          <p>Status</p>
          {userRole === 'ROLE_ADMIN' && <p>Ações</p>}
        </LineTicket>
        {ticketsList.map((ticket: any) => (
          <DivTicket key={ticket.idRefund}>
            <LineTicket>
              <div>{ticket.name}</div>
              <div>{ticket.title}</div>
              <div>{ticket.date}</div>
              <div>{ticket.value}</div>
              <div>{ticket.status}</div>
              {userRole !== 'ROLE_COLABORADOR' && (
                <div>
                  <ButtonAction color="#29CC97">Aprovar</ButtonAction>
                  <ButtonAction color="#F12B2C">Recusar</ButtonAction>
                </div>
              )}
            </LineTicket>
            <DivItem>
              <LineItem id="header">
                <p>Item</p>
                <p>Ocorreu em</p>
                <p>Valor</p>
                <p>Comprovante</p>
              </LineItem>
              {ticket.items.map((item: any) => (
                <LineItem key={item.idItem + ticket.idRefund}>
                  <p>{item.name}</p>
                  <p>{item.dateItem}</p>
                  <p>{item.value}</p>
                  <a href={item.imageString} target="_blank" download>
                    Anexo
                  </a>
                </LineItem>
              ))}
            </DivItem>
          </DivTicket>
        ))}
        <DivPagButtons>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={pages}
          />
        </DivPagButtons>
      </ContainerListTicket>
    </ContainerMain>
  );
};

const mapStateToProps = (state: RootState) => ({
  ticketsList: state.tickets.ticketsList,
  pages: state.tickets.totalPages,
  token: state.auth.token,
  roles: state.auth.roles,
});

export default connect(mapStateToProps)(ListTickets);
