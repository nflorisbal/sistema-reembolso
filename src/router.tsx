import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import AddTicket from './pages/addticket/AddTicket';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import NotFound from './pages/notfound/NotFound';
import SignUp from './pages/signup/SignUp';
import ListTicketsPage from './pages/tickets/ListTicketsPage';
import UpdateItem from './pages/updateitem/UpdateItem';
import UpdateUser from './pages/updateuser/UpdateUser';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/updateuser" element={<UpdateUser />}>
          <Route path=":id" element={<UpdateUser />} />
        </Route>
        <Route path="/updateitem" element={<UpdateItem />}>
          <Route path=":id" element={<UpdateItem />} />
        </Route>
        <Route path="/addticket" element={<AddTicket />} />
        <Route path="/tickets" element={<ListTicketsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
