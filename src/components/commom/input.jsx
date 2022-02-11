import React from 'react';

const Input = ({ name, label, value, error, onChange, type = 'text', placeholder = '', autoFocus = false }) => {
    return (
        <div className="mb-3 form-group">
            <label htmlFor={name} className="form-label label">{ label }</label>
            <input 
                value={value}
                onChange={onChange}
                autoFocus={autoFocus}
                className="form-control"
                placeholder={placeholder}
                id={name}
                name={name}
                type={type}
            />
            { error && <div className="fc-red">{ error }</div> }
        </div>        
    );
}
 
export default Input;