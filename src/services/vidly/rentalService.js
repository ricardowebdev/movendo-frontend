import http from '../common/httpService';
import config from '../../config.json';
import { toast } from 'react-toastify';

const uri = config.backendApi;
  
export async function insert(rental) {
    return await http.post(`${uri}rentals`, rental)
    .then(function (response) {
        const rental = response.data;
        toast.info('Rental registered successfully');
        return rental;
    })
    .catch(function (error) {
        if (error.response && error.response.data) { toast.error(error.response.data); }
        return false;
    });
}

export async function update(id, rental) {
    return await http.put(`${uri}rentals/${id}`, rental)
    .then(function (response) {
        const rental = response.data;
        toast.info('Rental updated successfully');
        return rental;
    })
    .catch(function (error) {
        if (error.response && error.response.data) { toast.error(error.response.data); }
        return false;
    });
}

export async function getRentals() {
    return await http.get(`${uri}rentals`)
    .then(function (response) {
        const rentals = response.data;
        return rentals.filter(r => r);
    })
    .catch(function (error) {
        if (error.response && error.response.data) { toast.error(error.response.data); }
        return false;
    });
}

export async function deleteRental(id) {
    return await http.patch(`${uri}rentals/${id}`)
    .then(function (response) {
        return response ? true : false;
    })
    .catch(function (error) {
        if (error.response && error.response.data) { toast.error(error.response.data); }
        return false;
    });    
}

export async function getRental(id) {
    return await http.get(`${uri}rentals/${id}`)
    .then(function (response) {
        const rental = response.data;
        return rental;
    })
    .catch(function (error) {
        return false;
    });    
}