import React from 'react';
import Form from '../commom/form';
import Joi from 'joi-browser';
import { login, getUserInfo } from "../../services/vidly/authService";

class LoginForm extends Form {
    state = {
        data: { email: '', password: '' },
        errors: {}
    }

    schema = {
        email: Joi.string().email().required().label('E-mail'),
        password: Joi.string().required().label('Password'),
    }

    doSubmit = async() => {
        const logged = await login(this.state.data);  

        const { state } = this.props.location;
        if (logged) {
            await getUserInfo(); 
            window.location = state ? state.from.pathname : '/';
        }
    }
   
    render() {
        return (   
            <div className="container-fluid center">
                <div className="col-sm-11 col-md-9 col-lg-7 center">
                    <h1>Login</h1>
                    <form onSubmit={this.handleSubmit}>
                        { this.renderInput('email', 'E-mail', 'email', true) }
                        { this.renderInput('password', 'Password', 'password') }
                        { this.renderButton('Login') }
                    </form>
                </div>
            </div>
        );
    }
}
 
export default LoginForm;