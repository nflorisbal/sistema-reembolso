import { useEffect, useState } from 'react';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { Block } from 'notiflix';
import { StatusEnum, StatusColor } from '../../enums/Status';
import { RootState } from '../../store';
import {
  deleteTicket,
  listTickets,
  listTicketsByName,
} from '../../store/actions/ListTicketsActions';
import {
  ContainerFind,
  ContainerListTicket,
  DivItem,
  DivPagButtons,
  DivTicket,
  InputFind,
  LineItem,
  LineTicket,
  LinkItem,
  StatusTicket,
} from './ListTickets.style';
import Pagination from '../pagination/Pagination';
import { ButtonAction, ContainerMain, PageTitle } from '../../global.styles';
import { updateStatusTicket } from '../../store/actions/AddTicketActions';
import { fixBase64, setupValor } from '../../utils';
import ZeroTicket from '../zeroticket/ZeroTicket';
import { Theme } from '../../theme';
import { useNavigate } from 'react-router-dom';

const MIN_LENGTH_FOR_SEARCH_BAR = 2;

const ListTickets = (state: RootState & AnyAction) => {
  const { ticketsList, dispatch, token, roles, totalPages } = state;
  const [currentPage, setCurrentPage] = useState<number>(0);
  const navigate = useNavigate();
  const userRole = roles[0]?.role;

  useEffect(() => {
    Block.circle('.listTickets');
    listTickets(dispatch, token, currentPage);
    // eslint-disable-next-line
  }, [currentPage]);

  const handleSearch = (value: string) => {
    if (value === '') {
      Block.circle('.listTickets');
      listTickets(dispatch, token, currentPage);
    } else if (value.length > MIN_LENGTH_FOR_SEARCH_BAR) {
      Block.circle('.listTickets');
      listTicketsByName(dispatch, token, value);
    }
  };

  const handleDelete = async (id: number) => {
    Block.circle('.listTickets');
    await deleteTicket(token, id);
    listTickets(dispatch, token, currentPage);
  };

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
        {userRole !== 'ROLE_COLABORADOR' && (
          <ContainerFind>
            <InputFind
              name="find"
              placeholder="Buscar usuário por nome"
              onChange={(event) => handleSearch(event.target.value)}
            />
          </ContainerFind>
        )}
        {!ticketsList.length ? (
          <ZeroTicket />
        ) : (
          <>
            {ticketsList.map((ticket: any) => (
              <div key={ticket.idRefund}>
                <LineTicket className="header">
                  <p>Usuário</p>
                  <p>Título</p>
                  <p>Total</p>
                  <p>Status</p>
                  <p>Ações</p>
                </LineTicket>
                <DivTicket>
                  <LineTicket>
                    <div>{ticket.name}</div>
                    <div>{ticket.title}</div>
                    <div>{'R$ ' + setupValor(ticket.value)}</div>
                    <StatusTicket color={StatusColor[ticket.status]}>
                      {StatusEnum[ticket.status]}
                    </StatusTicket>
                    {userRole !== 'ROLE_COLABORADOR' &&
                    userRole !== 'ROLE_ADMIN' ? (
                      <div>
                        <ButtonAction
                          color={Theme.color.positiveAction}
                          onClick={() => setupAprovar(ticket.idRefund)}
                        >
                          Aprovar
                        </ButtonAction>
                        <ButtonAction
                          color={Theme.color.negativeAction}
                          onClick={() => setupReprovar(ticket.idRefund)}
                        >
                          Reprovar
                        </ButtonAction>
                      </div>
                    ) : (
                      <div>
                        <ButtonAction
                          color={Theme.color.negativeAction}
                          onClick={() => handleDelete(ticket.idRefund)}
                          disabled={ticket.status !== 'ABERTO'}
                        >
                          Excluir
                        </ButtonAction>
                      </div>
                    )}
                  </LineTicket>
                  <DivItem>
                    <LineItem className="header">
                      <p>Item</p>
                      <p>Ocorreu em</p>
                      <p>Valor</p>
                      <p>Comprovante</p>
                    </LineItem>
                    {ticket.items.map((item: any) => (
                      <LineItem key={`i-${item.idItem}`}>
                        <p>{item.name}</p>
                        <p>{item.dateItem}</p>
                        <p>{'R$ ' + setupValor(item.value)}</p>
                        <LinkItem
                          href={fixBase64(item.imageString)}
                          target="_blank"
                          rel="noreferrer"
                          download
                        >
                          Anexo
                        </LinkItem>
                        {userRole === 'ROLE_COLABORADOR' &&
                          ticket.status === 'ABERTO' && (
                            <LinkItem
                              href="#!"
                              onClick={() =>
                                navigate(`updateitem/${item.idItem}`)
                              }
                            >
                              Editar
                            </LinkItem>
                          )}
                      </LineItem>
                    ))}
                  </DivItem>
                </DivTicket>
              </div>
            ))}
            <DivPagButtons>
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            </DivPagButtons>
          </>
        )}
      </ContainerListTicket>
    </ContainerMain>
  );
};

const mapStateToProps = (state: RootState) => ({
  ticketsList: state.tickets.ticketsList,
  totalPages: state.tickets.totalPages,
  token: state.auth.token,
  roles: state.auth.roles,
});

export default connect(mapStateToProps)(ListTickets);
