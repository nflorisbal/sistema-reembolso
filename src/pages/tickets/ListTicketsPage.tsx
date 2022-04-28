import { useEffect } from 'react';
import { connect, DispatchProp } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ListTickets from '../../components/listtickets/ListTickets';
import ZeroTicket from '../../components/zeroticket/ZeroTicket';
import { ArrayTicketDTO } from '../../models/TicketDTO';
import { RootState } from '../../store';
import { hasToken } from '../../utils';

const ListTicketsPage = (state: ArrayTicketDTO & DispatchProp) => {

  const {ticketsList} = state;
  console.log(state)
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasToken()) {
      navigate('/login');
    }

    // eslint-disable-next-line
  }, []);

  return (
    <>{ticketsList.length  
      ? <ListTickets />
      : <ZeroTicket />
      }
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  ticketsList: state.tickets.ticketsList,
  loadingTickets: state.tickets.loadingTickets,
  totalElements: state.tickets.totalElements,
  totalPages: state.tickets.totalPages,
});

export default connect(mapStateToProps)(ListTicketsPage);
