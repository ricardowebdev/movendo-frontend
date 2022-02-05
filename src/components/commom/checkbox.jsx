import React from 'react';


const Checkbox = ({ name, label, value, error, onChange }) => {
    return (
        <div className="mb-3 form-group">                            
            <input className="form-check-input ml-1" 
                type="checkbox"
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                checked={value}
            />
            <label className="form-check-label ml-4" htmlFor={name}>{ label }</label>
            { error && <div className="alert alert-danger">{ error }</div> }
        </div>
    );
}
 
export default Checkbox;