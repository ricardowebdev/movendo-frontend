import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../../services/vidly/authService';

const AdminRoute = ({path, component: Component, render, ...rest }) => {
    return (
        <Route 
            {...rest}
            render={props => {
                if (!auth.getLoggedUser() || !auth.isAdmin()) { 
                    return  (
                        <Redirect to={{
                            pathname: '/',
                            state: { from: props.location }
                        }} /> 
                    ) 
                }
                
                return Component ? <Component {...props} /> : render(props);
            }}
        />
    );
}
 
export default AdminRoute;