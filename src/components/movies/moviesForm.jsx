import React from 'react';
import Form from '../commom/form';
import Joi from 'joi-browser';
import { editMovie, getMovie, saveMovie } from "../../services/vidly/movieService";
import { getGenres } from '../../services/vidly/genreService';

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
        errors: {},
        title: 'Add a new Movie',
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
        }

        const title =  id ?  `Edit Movie ${id}` : 'Add a new movie';
        this.setState({ genres, title, data });
    }
    
    render() {   
        return (
            <div className="container">
                <div className="col-8 center">
                    <h3 className="mt-3">{this.state.title}</h3>
                    <form onSubmit={this.handleSubmit}>
                        { this.renderInput('title', 'Title', 'text', true) }
                        { this.renderSelect('genreId', 'Genre', this.state.genres, this.state.data.genreId)}
                        { this.renderInput('numberInStock', 'Stock', 'number') }
                        { this.renderInput('dailyRentalRate', 'Rate', 'number') }
                        { this.renderButton('Save') }
                    </form>
                </div>
            </div>
        );
    }
}
 
export default MoviesForm;