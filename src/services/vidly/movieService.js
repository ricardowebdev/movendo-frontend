import http from '../common/httpService';
import { toast } from 'react-toastify';
import config from '../../config.json';
const header = { 'Accept': 'application/json'};
const uri = config.backendApi + 'movies';

  
export async function getMovies() {
    return await http.get(`${uri}`, header)
    .then(function (response) {
        const movies = response.data;
        return movies.filter(m => m);
    })
    .catch(function (error) {
        const movies = [];
        return movies.filter(m => m);
    });
}

export async function getMovie(id) {
    return await http.get(`${uri}/${id}`, header)
    .then(function (response) {
        return response.data[0];
    })
    .catch(function (error) {
        return {};
    });
}

export async function saveMovie(movie) {
    return await http.post(`${uri}`, movie, header)
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        return {};
    });    
}

export async function editMovie(id, movie) {
    return await http.put(`${uri}/${id}`, movie, header)
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        return {};
    });    
}

export async function deleteMovie(id) {
    return await http.delete(`${uri}/${id}`, header)
    .then(function (response) {
        return response ? true : false;
    })
    .catch(function (error) {
        return false;
    });    
}

export async function setLike(id) {
   return await http.patch(`${uri}/${id}`, header)
    .then(function (response) {
        return response ? true : false;
    })
    .catch(function (error) {
        return false;
    });    
}