import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../../services/vidly/authService';

const ProfileRoute = ({path, component: Component, render, ...rest }) => {
    const admin = auth.isAdmin();
    const logged = auth.getLoggedUser();
    let id = auth.getLoggedUser();
    id = id.id;
    const routeId = rest.computedMatch.params.id || 0;

    return (
        <Route 
            {...rest}
            render={props => {
                if ( !logged || (!admin && parseInt(routeId) !== parseInt(id)) ) { 
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
 
export default ProfileRoute;