import React, { Component } from 'react';
import Joi  from 'joi-browser';
import Input from '../commom/input';
import Select from '../commom/select';
import Checkbox from '../commom/checkbox';

class Form extends Component {
    state = {
        data: {},
        errors: {}
    }

    validate = () => {
        const options = { abortEarly: false }
        const { error } = Joi.validate(this.state.data, this.schema, options);

        if (!error) return null;

        const errors = {};
        for (let item of error.details) {
            errors[item.path[0]] = item.message;
        }

        return errors;
    }

    validateProperty = ({ name, value }) => {
        const obj    = { [name]: value };
        const schema = { [name]: this.schema[name] }
        const { error } = Joi.validate(obj, schema);

        return !error ? null : error.details[0].message;
    }

    handleSubmit = e => {
        e.preventDefault();
        const errors = this.validate();
     
        this.setState({ errors: errors || {} });
        if (errors) return;

        this.doSubmit();
    }

    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);

        errorMessage
            ? errors[input.name] = errorMessage
            : delete errors[input.name];

        const data = {...this.state.data}
        input.type === 'checkbox'
            ? data[input.name] = input.checked
            : data[input.name] = input.value;

        this.setState({ data, errors });
    }

    renderButton = (label) => {
        return (
            <button 
                disabled={this.validate()}
                type="submit"
                className="btn btn-primary">
                {label}
            </button>
        );
    }

    renderInput = (name, label, type = 'text', autoFocus = false) => {
        const { data, errors } = this.state;
        return (
            <Input 
                name={name}
                label={label}
                type={type}
                autoFocus={autoFocus}
                onChange={this.handleChange}
                value={data[name]}
                error={errors[name]}
            />            
        )        
    }

    renderSelect = (name, label, items, selected = '', path = 'id', display = 'name') => {
        const { errors } = this.state;
        return (
            <Select
                data={items}
                id={name}
                name={name}
                label={label}
                onChange={this.handleChange}
                path={path}
                display={display}
                selected={selected}
                error={errors[name]}
            />           
        )   
    }

    renderCheckbox = (name, label) => {
        const { data, errors } = this.state;
        return (
            <Checkbox 
                name={name}
                label={label}
                onChange={this.handleChange}
                value={data[name]}
                error={errors[name]}
            />            
        )        
    }
}
 
export default Form;