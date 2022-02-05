import React from 'react';
import Form from '../commom/form';
import Joi from 'joi-browser';
import { login } from "../../services/vidly/loginService";

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
        const result = await login(this.state.data);
        result 
            ? this.props.history.push('/movies')
            : this.props.history.push('/login');          
    }
   
    render() {
        return (   
            <div className="container">
                <div className="col-6 center">
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