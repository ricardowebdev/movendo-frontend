import http from '../common/httpService';
import { toast } from 'react-toastify';
import config from '../../config.json';

const uri = config.backendApi;
http.setJwt(getToken());
  
export async function login(login) {
    return await http.post(`${uri}login`, login)
    .then(function (response) {
        const token = response.data;
        let logged = false;

        toast.info('User logged successfully');


        if (token.access_token !== undefined) {
            localStorage.setItem('token', token.access_token);
            logged = true;
        } 

        return logged;
    })
    .catch(function (error) {
        if (error.response.status === 401) {
            toast.error('Invalid credentials');
            return false;
        }

        if (error.response && error.response.data) { toast.error(error.response.data); }
        
        return false;
    });
}

export async function getUserInfo() {
    http.setJwt(getToken());
    
    return await http.post(`${uri}me`, {})
        .then(function (response) {
            const user = response.data;        

            if (user.id !== undefined) {
                localStorage.setItem('loggedUser', JSON.stringify(user));
                return user;
            }
            
            return false;
        })
        .catch(function (error) {
            if (error.response && error.response.data) { toast.error(error.response.data); }
            return false;
        }
    );   
}

export async function logout() {
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('token')
    
    return await http.post(`${uri}logout`, {})
    .then(function (response) {
        return response;
    })
    .catch(function (error) {
        if (error.response && error.response.data) { toast.error(error.response.data); }        
        return false;
    });
}

export function getToken() {
    const token = localStorage.getItem('token');
    return token;
}

export function getLoggedUser() {
    return JSON.parse(localStorage.getItem('loggedUser'));
}

export function isAdmin() {
    try {
        const user = JSON.parse(localStorage.getItem('loggedUser'));
        return user.admin !== undefined && user.admin === 1 ? true : false;    
    } catch (e) {
        return false
    }
}

export default {
    getToken: getToken,
    logout: logout,
    getUserInfo: getUserInfo,
    login: login,
    getLoggedUser: getLoggedUser,
    isAdmin: isAdmin
}