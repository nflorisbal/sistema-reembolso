import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const haveToken = localStorage.getItem('token');

  useEffect(() => {
    if (haveToken) {
      console.log('logado');
    } else {
      navigate('/login');
    }
  }, []);

  return <div>Home</div>;
};
export default Home;
