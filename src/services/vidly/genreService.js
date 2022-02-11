import http from '../common/httpService';
import config from '../../config.json';
  
const uri = config.backendApi + 'genres';


export async function getGenres() {
    const result = await http.get(`${uri}`);
    const genres = result.data;

    return genres.filter(g => g);
}
