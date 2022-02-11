import React from 'react'
import Select from 'react-select';

const SearchSelect = ({ data, id, name, label, onChange, error, value = { value: '', label: ''} }) => {
    return (
        <React.Fragment>
            <label htmlFor={name} className="form-label label mb-2">{ label }</label>
            <Select 
                options={data}
                value={value}
                name={name}
                onChange={onChange} 
                id={id}
                isSearchable
            />
            { error && <div className="alert alert-danger">{ error }</div> }
        </React.Fragment>
    );
}
 
export default SearchSelect;
