import axios from 'axios';
import { toast } from 'react-toastify';
import logger from './logService';




axios.interceptors.response.use(null, error => {  
  const expectedError = 
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  const unauthorized = error.response.status === 401;
  const uri = error.response.request.responseURL || '';

  if (!expectedError) {
    logger.log(error);
    toast.error("Something unexpected went wrong!!!");
  }

  if (unauthorized && uri.indexOf('login') <= 0) {
    setTimeout(() => {
      window.location.href = '/login';  
    }, 2000); 

    toast.warning("You're not allowed to access this resource, please make login and them come back");   
  }
  
  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}


export default {
    get: axios.get,
    put: axios.put,
    delete: axios.delete,
    post: axios.post,
    patch: axios.patch,
    setJwt: setJwt
}