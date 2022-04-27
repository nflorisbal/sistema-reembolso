import { useEffect } from 'react';
import { listTickets } from '../../store/actions/ListTicketsActions';
import { RootState } from '../../store';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { ContainerMain, PageTitle } from '../../global.styles';
import {
  ContainerListTicket,
  DivPagButtons,
  DivTicket,
  TicketHeader,
  LineItem,
  LineTicket,
} from './ListTickets.style';

const ListTickets = (state: RootState & AnyAction) => {
  const { ticketsList, dispatch, token } = state;

  useEffect(() => {
    listTickets(dispatch, token);
  }, []);

  console.log(ticketsList);
  return (
    <ContainerMain>
      <ContainerListTicket>
        <PageTitle>Tickets</PageTitle>
        <TicketHeader>
          <p>Usuário</p>
          <p>Título</p>
          <p>Solicitado em</p>
          <p>Valor</p>
          <p>Status</p>
          <p>Ações</p>
        </TicketHeader>
        {ticketsList.map((ticket: any) => (
          <DivTicket>
            <LineTicket key={ticket.title}>
              <div>Fulano de Tal</div>
              <div>{ticket.title}</div>
              <div>{ticket.date}</div>
              <div>{ticket.value}</div>
              <div>{ticket.status}</div>
              <div>
                <button>Aprovar</button>
                <button>Reprovar</button>
              </div>
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
          {/* inserir logica para paginação */}
          <button onClick={() => listTickets(dispatch, token)}>Anterior</button>
          <button onClick={() => listTickets(dispatch, token)}>Próxima</button>
        </DivPagButtons>
      </ContainerListTicket>
    </ContainerMain>
  );
};

const mapStateToProps = (state: RootState) => ({
  ticketsList: state.tickets.ticketsList,
  loading: state.tickets.loadingTickets,
  token: state.auth.token,
});

export default connect(mapStateToProps)(ListTickets);
