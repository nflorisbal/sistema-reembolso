import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddTicket from './pages/addticket/AddTicket';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import NotFound from './pages/notfound/NotFound';
import SignUp from './pages/signup/SignUp';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/addticket" element={<AddTicket />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
