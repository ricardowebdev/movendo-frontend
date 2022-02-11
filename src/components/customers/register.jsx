import React from 'react';
import Form from '../commom/form';
import Joi from 'joi-browser';
import { getCustomer, register, update } from "../../services/vidly/userService";
import Loader from '../commom/loader';

class Register extends Form {
    state = {
        data: { 
            email: '',
            password: '',
            name: '',
            oldPassword: '',
            id: 0,
            admin: false
        },
        errors: {},
        title:  `Register at Vidly`,
        loading: 'true'
    }

    schema = {
        id: Joi.number().empty(),
        name: Joi.string().required().label('Name'),
        email: Joi.string().required().email().label('E-mail'),
        password: Joi.string().min(5).required().label('Password'),
        oldPassword: Joi.string().min(5).allow('').optional().optional().label('Old Password'),
        admin: Joi.boolean()
    }

    doSubmit = async() => {
        const id = this.props.match.params.id || null;
        const result = id 
            ?  await update(id, this.state.data)
            :  await register(this.state.data);
        
        if (result) {
            this.props.history.push('/customers')
        } 
    }

    async componentDidMount() {
        const id = this.props.match.params.id || null;
        const data = { ...this.state.data };

        if (id) {
            const result = await getCustomer(id);
            if (!result) {
                this.props.history.push('/not-found');
            }

            data.email = result.email;
            data.name = result.name;
            data.password = '';
            data.oldPassword = '';
            data.admin = result.admin ? true : false;
            data.id = id;
        }

        const title =  id ?  `Edit a customer` : 'Register at Vidly';
        this.setState({ title, data, loading: '' });
    }
  
    render() {
        const id = this.props.match.params.id || null;
        return (
            <React.Fragment>
                <Loader isloading={this.state.loading}></Loader>
                <div className={this.state.loading ? 'hidden' : 'container-fluid'}>
                    <div className="row">
                        <div className="col m-2">
                            <h1>{ this.state.title }</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-7 col-sm-9 col-lg-6 center m-2">                    
                            <form onSubmit={this.handleSubmit} className="m-1">
                                { this.renderInput('name', 'Name', 'text', true) }
                                { this.renderInput('email', 'E-mail', 'email',) }
                                { id ? this.renderInput('oldPassword', 'Old Password', 'password') : '' }
                                { this.renderInput('password', 'Password', 'password') }
                                { this.renderCheckbox('admin', 'Admin') }                          
                                { this.renderButton('Save') }
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Register;