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

<<<<<<< HEAD
  return  <ListTickets />;
=======
  return <ListTickets />;
>>>>>>> 35d710a642cb26999f453a1d32a24935fce22846
};

export default ListTicketsPage;
