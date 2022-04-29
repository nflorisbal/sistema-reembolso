import { useEffect, useState } from 'react';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import { listTickets } from '../../store/actions/ListTicketsActions';
import {
  ContainerListTicket,
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
    listTickets(dispatch, token);
  }, []);

  return (
    <ContainerMain>
      <ContainerListTicket>
        <PageTitle>Tickets</PageTitle>
        <LineTicket id="header">
          <p>Usuário</p>
          <p>Título</p>
          <p>Solicitado em</p>
          <p>Valor</p>
          <p>Status</p>
          {userRole === 'ROLE_ADMIN' && <p>Ações</p>}
        </LineTicket>
        {ticketsList.map((ticket: any) => (
          <DivTicket key={ticket.title}>
            <LineTicket>
              <div>Fulano de Tal</div>
              <div>{ticket.title}</div>
              <div>{ticket.date}</div>
              <div>{ticket.value}</div>
              <div>{ticket.status}</div>
              {userRole === 'ROLE_ADMIN' && (
                <div>
                  <ButtonAction color="#29CC97">Aprovar</ButtonAction>
                  <ButtonAction color="#F12B2C">Recusar</ButtonAction>
                </div>
              )}
            </LineTicket>
            <div>
              {ticket.items.map((item: any) => (
                <LineItem key={item.idItem}>
                  <p>{item.name}</p>
                  <p>{item.dateItem}</p>
                  <p>{item.value}</p>
                  <a href={item.image} target="_blank" download>
                    Anexo
                  </a>
                </LineItem>
              ))}
            </div>
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
  loading: state.tickets.loadingTickets,
  token: state.auth.token,
  roles: state.auth.roles,
  pages: state.list.totalPages,
});

export default connect(mapStateToProps)(ListTickets);
