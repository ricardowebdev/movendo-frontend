import React from 'react';
import Form from '../commom/form';
import Joi from 'joi-browser';
import { editMovie, getMovie, saveMovie } from "../../services/vidly/movieService";
import { getGenres } from '../../services/vidly/genreService';
import Loader from '../commom/loader';

class MoviesForm extends Form {
    state = {
        genres: [
            { id: '', name: '' }
        ],
        data: {
            id: 0,
            title: '',
            genreId: '',
            numberInStock: '',
            dailyRentalRate: '',
        },
        selecteds: {
            genreId: { value: '', label: '' }
        },
        errors: {},
        title: 'Add a new Movie',
        loading: 'true'
    }

    schema = {
        id: Joi.number().empty(),
        title: Joi.string().required().label('Title'),
        genreId: Joi.number().required().label('Genre'),
        numberInStock: Joi.number().integer().min(0).max(100).required().label('Number in Stock'),
        dailyRentalRate: Joi.number().min(1).max(10).required().label('Rate')        
    }


    doSubmit = () => {
        const id = this.props.match.params.id || null;

        id 
            ? editMovie(id, this.state.data)
            : saveMovie(this.state.data);

        this.props.history.push('/movies');
    }

    async componentDidMount() {
        const allGenres = await getGenres();
        const genres = [{ id: '', name: ''}, ...allGenres];
        const id = this.props.match.params.id || null;
        const data = { ...this.state.data };
        let { genreId } = { ...this.state.selecteds };

        if (id) {
            const result = await getMovie(id);
            if (!result) {
                this.props.history.push('/not-found');
            }

            data.title = result.title;
            data.genreId = result.genre.id;
            data.numberInStock = result.numberInStock;
            data.dailyRentalRate = result.dailyRentalRate;
            data.id = id;

            const genre = genres.filter(g => ( result.genre.id === g.id ));
            genreId = {
                value: result.genre.id,
                label: genre[0].name,
                name: 'genreId',
                path: 'id',
            }
        }

        const selecteds = { genreId }        

        const title =  id ?  `Edit a Movie` : 'Add a new movie';
        this.setState({ genres, title, data, loading: '', selecteds });
    }
    
    render() {   
        const loading = this.state.loading;
        return (
            <React.Fragment>
                <div className={ !loading ? 'hidden' : 'container-fluid'}>
                    <div className="row">
                        <div className="col m-2">
                            <Loader isloading={loading}></Loader>
                        </div>
                    </div>
                </div>
                
                <div className={loading ? 'hidden' : 'container-fluid'}>
                    <div className="row">
                        <div className="col m-2">
                            <h1>{ this.state.title }</h1>
                        </div>
                    </div>

                    <div className="col-md-7 col-sm-9 col-lg-6 center">
                        <form onSubmit={this.handleSubmit}>
                            { this.renderInput('title', 'Title', 'text', true) }
                            { this.renderSearchSelect('genreId', 'Genre', this.state.genres, this.state.selecteds.genreId, 'id', 'name', this.state.data.genreId)}
                            { this.renderInput('numberInStock', 'Stock', 'number') }
                            { this.renderInput('dailyRentalRate', 'Rate', 'number') }
                            { this.renderButton('Save') }
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default MoviesForm;