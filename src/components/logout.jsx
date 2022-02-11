import { Component } from 'react';
import { logout } from '../services/vidly/authService';

class Logout extends Component {
    componentDidMount() {
        logout();
        window.location = '/login';
    }
    
    render() { 
        return null;
    }
}
 
export default Logout;