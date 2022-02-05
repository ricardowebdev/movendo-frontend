import axios from 'axios';
import { toast } from 'react-toastify';
import logger from "./logService";

axios.interceptors.response.use(null, error => {
  const expectedError = 
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  

  if (!expectedError) {
    logger.log(error);
    toast.error("Something unexpected went wrong!!!");
  }
  
  return Promise.reject(error);
});

export default {
    get: axios.get,
    put: axios.put,
    delete: axios.delete,
    post: axios.post,
    patch: axios.patch
}