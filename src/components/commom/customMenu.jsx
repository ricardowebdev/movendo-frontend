import React from 'react';
import { NavLink } from 'react-router-dom';
import auth from '../../services/vidly/authService';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

export default function CustomMenu({ user }) {
    return (
        <React.Fragment>
            <header className="d-flex flex-wrap align-items-center justify-content-start justify-content-md-between py-3 mb-4 border-bottom bg-primary">
                <ul className="nav col-12 col-md-auto mb-2 justify-content-start mb-md-0">
                    {   !user &&
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login">
                                <div className="container">
                                    <i className="fa fa-film fa-2x"></i>
                                    <span className="title"> Movendo</span><br />
                                    <span className="subtitle"> Rent a film</span>
                                </div>
                            </NavLink>
                        </li>
                    }
                    {   
                        user &&
                        <React.Fragment>
                            <li>
                                <NavLink className="nav-link" aria-current="page" to="/movies"> <i className="fa fa-film"></i> Movies</NavLink>
                            </li>
                            {
                                auth.isAdmin() && 
                                <React.Fragment>
                                    <li>
                                        <NavLink className="nav-link" to="/customers"><i className="fa fa-user"></i> Customers</NavLink>
                                    </li>                                    
                                </React.Fragment>
                            }
                            <li>
                                <NavLink className="nav-link" to="/rentals"> <i className="fa fa-exchange"></i> Rentals</NavLink>
                            </li>                                    
                            <li>
                                <NavLink className="nav-link" to={`/customer/${user.id}`}><i className="fa fa-user-circle"></i> { user.name }</NavLink>
                            </li>
                            <li>
                                <NavLink className="nav-link" to={`/logout`}> <i className="fa fa-sign-out"></i> Logout</NavLink>
                            </li>
                        </React.Fragment>
                    }                
                </ul>
            </header>           
        </React.Fragment>
    );
}