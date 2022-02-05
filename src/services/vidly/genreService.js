import http from '../common/httpService';
  
export async function getGenres() {    
    const result = await http.get('http://localhost:8000/api/genres');
    const genres = result.data;
    // console.log();
    return genres.filter(g => g);
}
