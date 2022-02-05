import React  from 'react';

const Modal = () => {
    return (
        <React.Fragment>
            <button id="myBtn">Open Modal</button>
            <div id="myModal" className="modal">        
                <div className="modal-content">
                    <div className="modal-header">
                        <span className="close">&times;</span>
                        <h2>Modal Header</h2>
                    </div>
                    <div className="modal-body">
                        <p>Some text in the Modal Body</p>
                        <p>Some other text...</p>
                    </div>
                    <div className="modal-footer">
                        <h3>Modal Footer</h3>
                    </div>
                </div>        
            </div>
        </React.Fragment>        
    );
}
 
export default Modal;
