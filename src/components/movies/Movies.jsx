import React, {Component} from 'react';
import { getMovies, deleteMovie, setLike } from "../../services/vidly/movieService";
import { getGenres } from '../../services/vidly/genreService';
import Pagination from '../commom/Pagination';
import ListGroup from '../commom/ListGroup';
import paginate from '../utils/paginate';
import MoviesTable from './MoviesTable';
import Input from '../commom/input';
import _ from 'lodash';

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        pageSize: 5,
        currentPage: 1,
        currentGenre: '0',
        sortColumn: { path: 'title', order: 'asc' },
        search: ''
    }

    async componentDidMount() {
        const genres = await getGenres();
        const movies = await getMovies();
        this.setState({
            movies: movies,
            genres: [{ id: '0', name: 'All Genres'}, ...genres]    
        })
    }

    handleDelete = async(movie) =>  {
        const originalMovies = this.state.movies;
        let movies = this.state.movies.filter(m => m.id !== movie.id);
        const result = await deleteMovie(movie.id);

        if (!result) { movies = originalMovies; }

        this.setState({ movies });
    }

    handleLike = async(movie) => {
        const originalMovies = this.state.movies;        
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index].liked = !movie.liked;        
        this.setState({movies});

        const result = await setLike(movie.id);
        if (!result) { this.setState({movies: originalMovies}); }
    }

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    }

    handleItemSelect = (filter) => {
        this.setState({ currentGenre: filter.id, currentPage: 1, search: '' })
    }

    handleSort = sortColumn => {       
        this.setState({ sortColumn })
    }

    handleNewMovie = () => {
        this.props.history.push('/movies/new');
    }

    handleSearch = ({ currentTarget: input }) => {
        let { search, currentGenre } = {...this.state.search };
        currentGenre = '0';
        search = input.value;
        this.setState({ search, currentGenre, currentPage: 1 })
    }

    getPageData = () => {
        const { pageSize, currentPage, movies, currentGenre, sortColumn, search } = this.state;

        let filteredMovies = currentGenre !== '0'
            ? movies.filter(movie => ( movie.genre.id === currentGenre)) 
            : movies;


        if (search) {
            filteredMovies = movies.filter(movie => {
                const title = movie.title.toUpperCase()
                const newSearch = search.toUpperCase();
                return title.search(newSearch) >= 0;
            });
        }

        const sortedMovies = _.orderBy(filteredMovies, [sortColumn.path], [sortColumn.order])
        const renderMovies = paginate(sortedMovies, currentPage, pageSize);
        
        return { totalCount: filteredMovies.length, data: renderMovies }
    }

    render() {
        const { pageSize, currentPage, genres, currentGenre, sortColumn } = this.state;      
        const { totalCount, data } = this.getPageData();
        const message = totalCount 
            ? `Showing ${totalCount} movies in the database`
            : 'There are no movies in the database.';

        return (
            <React.Fragment>
                <div className="container-fluid">
                    <div className="row align-items-left">
                        <div className="col-auto m-2">
                            { message }
                        </div>
                        
                    </div>
                </div>                

                <div className="container-fluid">
                    <div className="row align-items-left">
                        <div className="col-auto m-2">
                            <ListGroup 
                                items={genres}
                                onItemSelect={this.handleItemSelect}
                                currentItem={currentGenre}
                            />
                        </div>

                        <div className="col-lg-9 m-2">
                            <div className="row align-items-end">
                                <div className="col">
                                    <Input 
                                        name='search'
                                        label='Search'
                                        type='text'
                                        value={this.state.search}
                                        autoFocus={true}
                                        onChange={this.handleSearch}
                                    />                                     
                                </div>
                                <div className="col-3">                                    
                                    <button onClick={this.handleNewMovie}
                                            className="btn btn-primary btn-sm mb-3">
                                        <i className="fa fa-plus"></i> New movie
                                    </button>
                                </div>
                            </div>
                            <MoviesTable 
                                renderMovies={data}
                                sortColumn={sortColumn}
                                onLike={this.handleLike}
                                onDelete={this.handleDelete}
                                onSort={this.handleSort}
                            />
                        </div>
                    </div>

                    <div className="row justify-content-md-center">
                        <div className="col-auto m-2">
                            <Pagination
                                itemsCount={totalCount}
                                pageSize={pageSize}
                                currentPage={currentPage}
                                onPageChange={this.handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Movies;