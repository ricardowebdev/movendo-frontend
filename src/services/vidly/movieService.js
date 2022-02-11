import http from '../common/httpService';
import { toast } from 'react-toastify';
import config from '../../config.json';

const uri = config.backendApi + 'movies';
  
export async function getMovies() {
    return await http.get(`${uri}`)
    .then(function (response) {
        const movies = response.data;
        return movies.filter(m => m);
    })
    .catch(function (error) {
        if (error.response && error.response.data) { toast.error(error.response.data); }
        const movies = [];
        return movies.filter(m => m);
    });
}

export async function getMovie(id) {
    return await http.get(`${uri}/${id}`)
    .then(function (response) {
        return response.data[0];
    })
    .catch(function (error) {
        if (error.response && error.response.data) { toast.error(error.response.data); }
        return {};
    });
}

export async function saveMovie(movie) {
    return await http.post(`${uri}`, movie)
    .then(function (response) {
        toast.info('Movie registered successfully');
        return response.data;
    })
    .catch(function (error) {
        if (error.response && error.response.data) { toast.error(error.response.data); }
        return {};
    });    
}

export async function editMovie(id, movie) {
    return await http.put(`${uri}/${id}`, movie)
    .then(function (response) {
        toast.info('Movie updated successfully');
        return response.data;
    })
    .catch(function (error) {
        if (error.response && error.response.data) { toast.error(error.response.data); }
        return {};
    });    
}

export async function deleteMovie(id) {
    return await http.delete(`${uri}/${id}`)
    .then(function (response) {
        toast.info('Movie removed successfully');
        return response ? true : false;
    })
    .catch(function (error) {
        if (error.response && error.response.data) { toast.error(error.response.data); }
        return false;
    });    
}

export async function setLike(id) {
   return await http.patch(`${uri}/${id}`)
    .then(function (response) {
        return response ? true : false;
    })
    .catch(function (error) {
        if (error.response && error.response.data) { toast.error(error.response.data); }
        return false;
    });    
}