import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { hasToken } from '../../utils';
import { ContainerMain } from '../../global.styles';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasToken()) {
      navigate('/login');
    }
  }, []);

  return (
    <ContainerMain>
      <h1>Bem-vindo(a) ao sistema de reembolso!</h1>
    </ContainerMain>
  );
};
export default Home;
