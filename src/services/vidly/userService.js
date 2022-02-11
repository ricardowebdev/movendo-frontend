import http from '../common/httpService';
import config from '../../config.json';
import { toast } from 'react-toastify';

const uri = config.backendApi;

export async function register(user) {
    return await http.post(`${uri}users`, user)
    .then(function (response) {
        const user = response.data;
        toast.info('User registered successfully');
        return user;
    })
    .catch(function (error) {
        if (error.response && error.response.data) { toast.error(error.response.data); }
        return false;
    });
}

export async function update(id, user) {
    return await http.put(`${uri}users/${id}`, user)
    .then(function (response) {
        const user = response.data;
        toast.info('User updated successfully');
        return user;
    })
    .catch(function (error) {
        if (error.response && error.response.data) { toast.error(error.response.data); }
        return false;
    });
}

export async function getCustomers() {
    return await http.get(`${uri}users`)
    .then(function (response) {
        const users = response.data;
        return users.filter(u => u);
    })
    .catch(function (error) {
        if (error.response && error.response.data) { toast.error(error.response.data); }
        return false;
    });
}

export async function deleteCustomer(id) {
    return await http.patch(`${uri}users/${id}`)
    .then(function (response) {
        return response ? true : false;
    })
    .catch(function (error) {
        if (error.response && error.response.data) { toast.error(error.response.data); }
        return false;
    });    
}

export async function getCustomer(id) {
    return await http.get(`${uri}users/${id}`)
    .then(function (response) {
        const user = response.data[0];
        return user;
    })
    .catch(function (error) {
        return false;
    });    
}