import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { hasToken } from '../../utils';
import { ContainerMain } from '../../global.styles';
import ListAllUsers from '../../components/listallusers/ListAllUsers';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasToken()) {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);

  return (
    <ContainerMain>
      <h1>Bem-vindo(a) ao sistema de reembolso!</h1>
      <ListAllUsers />
    </ContainerMain>
  );
};
export default Home;
