import './App.css';
import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { getLoggedUser } from './services/vidly/authService';
import Movies from './components/movies/Movies';
import MoviesForm from './components/movies/moviesForm';
import NotFound from './components/notFound';
import Rentals from './components/rentals/rentals';
import RentalsForm from './components/rentals/rentalsForm';
import Customers from './components/customers/customers';
import LoginForm from './components/Login/loginForm';
import Register from './components/customers/register';
import Logout from './components/logout';
import CustomMenu from './components/commom/customMenu';
import ProtectedRoute from './components/routeguards/protectedRoute';
import AdminRoute from './components/routeguards/adminRoute';
import ProfileRoute from './components/routeguards/profileRoute';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
    state = {}

    async componentDidMount() {
        this.setIsMobile();
        const user = getLoggedUser(); 
        if (user) { this.setState({ user }); }
    }

    setIsMobile() {
        const width  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const isMobile = width <= 700 ? true : false;
        this.setState({ isMobile });
    }

    render() {
        return (
            <React.Fragment>
                <ToastContainer  autoClose={3000} />
                <CustomMenu className="customMenu" user={ this.state.user } />
                <div className='content'>
                    <Switch>
                        <Route path="/login" component={LoginForm} />
                        <ProtectedRoute path="/movies" exact component={Movies} />
                        <AdminRoute path="/movies/new" exact component={MoviesForm} />
                        <AdminRoute path="/movies/:id" component={MoviesForm} />
                        <ProtectedRoute path="/rentals" exact component={Rentals} />
                        <ProtectedRoute path="/rentals/new" exact component={RentalsForm} />
                        <ProtectedRoute path="/rentals/:id" component={RentalsForm} />
                        <AdminRoute path="/customers" exact component={Customers} />
                        <AdminRoute path="/customers/new" component={Register} />
                        <ProfileRoute path="/customer/:id" component={Register} />
                        <Route path="/logout" component={Logout} />
                        <Route path="/not-found" component={NotFound} />
                        <Redirect from="/" to="/movies" exact />
                        <Redirect to="/not-found" />
                    </Switch>
                </div>
            </React.Fragment>
        );
    }
}

export default App;
