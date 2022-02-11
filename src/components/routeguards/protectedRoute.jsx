import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../../services/vidly/authService';

const ProtectedRoute = ({path, component: Component, render, ...rest }) => {
    return (
        <Route 
            {...rest}
            render={props => {
                if (!auth.getLoggedUser()) { 
                    return  (
                        <Redirect to={{
                            pathname: '/login',
                            state: { from: props.location }
                        }} /> 
                    ) 
                }
                
                return Component ? <Component {...props} /> : render(props);
            }}
        />
    );
}
 
export default ProtectedRoute;