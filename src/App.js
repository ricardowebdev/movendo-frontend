import './App.css';
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Movies from './components/movies/Movies';
import MoviesForm from './components/movies/moviesForm';
import Navbar from './components/navbar';
import NotFound from './components/notFound';
import Rentals from './components/rentals/rentals';
import RentalsForm from './components/rentals/rentalsForm';
import Customers from './components/customers/customers';
import LoginForm from './components/Login/loginForm';
import Register from './components/customers/register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <React.Fragment>
            <ToastContainer  autoClose={3000} />
            <Navbar />
            <div className='content'>
                <Switch>
                    <Route path="/login" component={LoginForm} />
                    <Route path="/movies" exact component={Movies} />
                    <Route path="/movies/new" exact component={MoviesForm} />
                    <Route path="/movies/:id" component={MoviesForm} />
                    <Route path="/rentals" exact component={Rentals} />
                    <Route path="/rentals/new" exact component={RentalsForm} />
                    <Route path="/rentals/:id" component={RentalsForm} />
                    <Route path="/customers" exact component={Customers} />
                    <Route path="/customers/new" component={Register} />
                    <Route path="/customer/:id" component={Register} />
                    <Route path="/not-found" component={NotFound} />
                    <Redirect from="/" to="/movies" exact />
                    <Redirect to="/not-found" />
                </Switch>
            </div>
        </React.Fragment>
    );
}

export default App;
