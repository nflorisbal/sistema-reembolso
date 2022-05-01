import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContainerMain, ContainerSmall } from '../../global.styles';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate('/'), 3000);
    // eslint-disable-next-line
  }, []);
  return (
    <ContainerMain height="100vh">
      <ContainerSmall>
        <h3>Página não encontrada.</h3>
      </ContainerSmall>
    </ContainerMain>
  );
};
export default NotFound;
