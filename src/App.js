
import { Route, Router, Switch } from 'react-router';
import './App.css';
import Home from './pages/Home/Home';
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import { createBrowserHistory } from 'history';
import Contact from './pages/Contact/Contact';
import News from './pages/News/News';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Detail from './pages/Detail/Detail';
import { LoginTemplate } from './templates/UserTemplate/LoginTemplate';
import { BookingTemplate } from './templates/BookingTemplate/BookingTemplate';
import Booking from './pages/Booking/Booking';
import Loading from './components/Loading/Loading';
import Profile from './pages/Profile/Profile';
import AdminTemplate from './templates/AdminTemplate/AdminTemplate';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import Films from './pages/Admin/Films/Films';
import AddNew from './pages/Admin/Films/AddNew/AddNew';
import Edit from './pages/Admin/Films/Edit/Edit';
import ShowTime from './pages/Admin/ShowTime/ShowTime';

export const history = createBrowserHistory()

function App() {
  return (
    <Router history={history}>
      <Loading />
      <Switch>
        <HomeTemplate exact path="/home" Component={Home} />
        <HomeTemplate exact path="/contact" Component={Contact} />
        <HomeTemplate exact path="/news" Component={News} />

        <HomeTemplate exact path="/detail/:id" Component={Detail} />
        <LoginTemplate exact path="/login" Component={Login} />
        <LoginTemplate exact path="/register" Component={Register} />

        <BookingTemplate exact path="/booking/:id" Component={Booking} />
        <HomeTemplate exact path="/profile" Component={Profile} />

        <AdminTemplate exact path="/admin" Component={Dashboard} />
        <AdminTemplate exact path="/admin/films" Component={Films} />
        <AdminTemplate exact path="/admin/films/addnew" Component={AddNew} />

        <AdminTemplate exact path="/admin/films/edit/:id" Component={Edit} />
        <AdminTemplate exact path="/admin/films/showtime/:id/:tenphim" Component={ShowTime} />


        <AdminTemplate path="/admin/users" exact Component={Dashboard} />



        <HomeTemplate exact path="/" Component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
