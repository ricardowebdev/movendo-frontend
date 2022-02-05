import React, {Component} from 'react';

class Select extends Component {
    render() { 
        const { data, id, name, label, onChange, error, path, display, selected }  = this.props;
        return (
            <div className="mb-3 form-group">
                <label htmlFor="genreSelect" className="form-label label">{ label }</label>
                <select className="form-control form-select form-select-lg mb-3"
                    aria-label=".form-select-lg example"
                    onChange={onChange}
                    id={id}
                    name={name}
                    value={selected}>
                    { 
                        data.map((item, index) => (
                            <option 
                                key={ `${item[path]}_${index}`}
                                value={item[path]}>
                                    { item[display] }
                            </option>
                        ))
                    }
                </select>
                { error && <div className="alert alert-danger">{ error }</div> }
            </div>
        );
    }
}
 
export default Select;
  