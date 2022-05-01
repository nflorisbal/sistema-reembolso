import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ListTickets from '../../components/listtickets/ListTickets';
import { hasToken } from '../../utils';

const ListTicketsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasToken()) {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);

  return <ListTickets />;
};

export default ListTicketsPage;
