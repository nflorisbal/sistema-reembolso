import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import { hasToken } from '../../utils';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (hasToken()) {
      console.log('logado');
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <>
      <Header />
    </>
  );
};
export default Home;
