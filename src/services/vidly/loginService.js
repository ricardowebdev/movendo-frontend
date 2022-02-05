import http from '../common/httpService';
import { toast } from 'react-toastify';
import config from '../../config.json';
const header = { 'Accept': 'application/json'};
const uri = config.backendApi;

  
export async function login(login) {
    return await http.post(`${uri}login`, login, header)
    .then(function (response) {
        const user = response.data;
        toast.info('User logged successfully');
        return user;
    })
    .catch(function (error) {
        if (error.response && error.response.data) { toast.error(error.response.data); }
        return false;
    });
}
