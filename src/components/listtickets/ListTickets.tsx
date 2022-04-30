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
import { updateStatusTicket } from '../../store/actions/AddTicketActions';
import { fixBase64 } from '../../utils';

const ListTickets = (state: RootState & AnyAction) => {
  const { ticketsList, dispatch, token, roles, pages } = state;
  const [currentPage, setCurrentPage] = useState<number>(0);
  const userRole = roles[0]?.role;

  useEffect(() => {
    Block.circle('.listTickets');
    listTickets(dispatch, token, currentPage);
  }, [currentPage]);

  const setupAprovar = async (id: number) => {
    if (userRole === 'ROLE_GESTOR') {
      const newStatus = { status: 1 };
      await updateStatusTicket(id, newStatus, token);
    }
    if (userRole === 'ROLE_FINANCEIRO') {
      const newStatus = { status: 4 };
      await updateStatusTicket(id, newStatus, token);
    }
    listTickets(dispatch, token, currentPage);
  };

  const setupReprovar = async (id: number) => {
    if (userRole === 'ROLE_GESTOR') {
      const newStatus = { status: 2 };
      await updateStatusTicket(id, newStatus, token);
    }
    if (userRole === 'ROLE_FINANCEIRO') {
      const newStatus = { status: 3 };
      await updateStatusTicket(id, newStatus, token);
    }
    listTickets(dispatch, token, currentPage);
  };

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
                  <ButtonAction
                    color="#29CC97"
                    onClick={() => setupAprovar(ticket.idRefund)}
                  >
                    Aprovar
                  </ButtonAction>
                  <ButtonAction
                    color="#F12B2C"
                    onClick={() => setupReprovar(ticket.idRefund)}
                  >
                    Reprovar
                  </ButtonAction>
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
                <LineItem key={`i-${item.idItem}`}>
                  <p>{item.name}</p>
                  <p>{item.dateItem}</p>
                  <p>{item.value}</p>

                  <a
                    href={fixBase64(item.imageString)}
                    target="_blank"
                    download
                  >
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
