import {
    ContainerListUsers,
    DivColumnName,
    DivPagButtons,
    LineList,
  } from '../listallusers/ListAllUsers.style';
  import { useEffect } from 'react';
  import { listTickets } from '../../store/actions/ListTicketsActions';
  import { RootState } from '../../store';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { ContainerMain, PageTitle  } from '../../global.styles';
import { GetTicketDTO } from '../../models/TicketDTO';

const ListTickets = (state: RootState & AnyAction) => {
    const {ticketsList, dispatch, token} = state

    useEffect(() => {
        listTickets(dispatch, token);
      }, []);

      console.log(ticketsList)
  return (
    <ContainerMain>
    <ContainerListUsers>
      <PageTitle>Lista de usuários</PageTitle>
      <LineList>
        <p>Título</p>
        <p>Total</p>
        <p>Data do pedido</p>
        <p>Anexos</p>
        <p>Situação</p>
      </LineList>
      {ticketsList.map((ticket: any) => (
        <LineList key={ticket.title}>
            <p>{ticket.title}</p>
            {ticket.items.map((item: any) =>(
                <div key={item.idItem}>
                <p>{item.name}</p>
                <p>{item.dateItem}</p>
                <p>{item.value}</p>
                <a href={item.image} target="_blank">Anexo</a>
                </div>
            ))}
            <button>Aprovar</button>
            <button>Reprovar</button>
          
        </LineList>
      ))}
      <DivPagButtons>
        {/* inserir logica para paginação */}
        <button onClick={() => listTickets(dispatch, token)}>
          Anterior
        </button>
        <button onClick={() => listTickets(dispatch, token)}>Próxima</button>
      </DivPagButtons>
    </ContainerListUsers>
  </ContainerMain>
  )
}

const mapStateToProps = (state: RootState) => ({
    ticketsList: state.tickets.ticketsList,
    loading: state.tickets.loadingTickets,
    token: state.auth.token,
  });

export default connect(mapStateToProps)(ListTickets)