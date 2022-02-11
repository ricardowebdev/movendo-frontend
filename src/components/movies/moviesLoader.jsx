import React from 'react';
import Loader from '../commom/loader';

const MoviesLoader = ({ loading }) => {
    return (
        <div className={loading ? 'container-fluid' : 'hidden'}>
            <div className="row">
                <div className="col-md-3 col-sm-6 col-lg-2">
                    <Loader isloading={loading} height={'200'}></Loader>    
                </div>

                <div className="col-md-9 col-sm-12 col-lg-10 p-2">
                    <div className="row">
                        <div className="col">&nbsp;</div>
                    </div>
                    
                    <div className="row">
                        <div className="col">
                            <Loader isloading={loading} height={'400'}></Loader>
                        </div>                    
                    </div>
                    
                </div>
            </div>                    
        </div>            
    );
}
 
export default MoviesLoader;