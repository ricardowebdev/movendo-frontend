import React from 'react';
import Form from '../commom/form';
import Joi from 'joi-browser';
import { getRental, insert, update } from "../../services/vidly/rentalService";
import { getMovies } from "../../services/vidly/movieService";
import { getCustomers } from "../../services/vidly/userService";
import Loader from '../commom/loader';

class RentalsForm extends Form {
    state = {
        data: { 
            userId: 0,
            movieId: 0,
            returned: false,
            rentalDays: 0,
            id: 0,
        },
        users: [],
        movies: [],
        errors: {},
        selecteds: {
            movieId: { value: '', label: '' },
            userId: { value: '', label: '' },
        },
        title:  `Rental a movie`,
        loading: 'true'
    }

    schema = {
        id: Joi.number().empty(),
        userId:  Joi.number().required().min(1).label('User'),
        movieId: Joi.number().required().min(1).label('Movie'),
        returned: Joi.boolean().required().label('Returned'),
        rentalDays: Joi.number().required().min(1).max(5).label('Rental Days'),
    }

    doSubmit = async() => {
        const id = this.props.match.params.id || null;
        const result = id 
            ?  await update(id, this.state.data)
            :  await insert(this.state.data);
        
        if (result) {
            this.props.history.push('/rentals')
        } 
    }

    async componentDidMount() {
        const id = this.props.match.params.id || null;
        const { data } = { ...this.state };
        let { movieId, userId } = { ...this.state.selecteds };
        const movies =  [{ id: 0, title: ''}, ...await getMovies()];
        const users = [{ id: 0, name: ''}, ...await getCustomers()];

        if (id) {
            const result = await getRental(id);
            if (!result) {
                this.props.history.push('/not-found');
            }

            data.userId = result.userId;
            data.movieId = result.movieId;
            data.returned = result.returned ? true : false;
            data.rentalDays = result.rentalDays;
            data.id = id;

            const movie = movies.filter(m => ( result.movieId === m.id ));
            movieId = {
                value: result.movieId,
                label: movie[0].title,
                name: 'userId',
                path: 'id',
            }
            
            const user = users.filter(u => ( result.userId === u.id ));
            userId = {
                value: result.userId,
                label: user[0].name,
                name: 'movieId',
                path: 'id',
            }
        }

        const selecteds = { movieId: movieId, userId: userId }

        const title =  id ?  `Edit a rental` : 'Insert a rental';
        this.setState({ title, data, movies, users, selecteds, loading: '' });
    }
  
    render() {
        return (
            <React.Fragment>
                <Loader isloading={this.state.loading}></Loader>
                <div className={this.state.loading ? 'hidden' : 'container-fluid'}>
                    <div className="row">
                        <div className="col m-2">
                            <h1>{ this.state.title }</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-7 col-sm-9 col-lg-6 center m-2">                    
                            <form onSubmit={this.handleSubmit} className="m-1">
                                { this.renderSearchSelect('userId', 'User', this.state.users, this.state.selecteds.userId, 'id', 'name', this.state.data.userId)}
                                { this.renderSearchSelect('movieId', 'Movies', this.state.movies, this.state.selecteds.movieId, 'id', 'title', this.state.data.movieId)}
                                { this.renderInput('rentalDays', 'Rental Days', 'number') }
                                { this.renderCheckbox('returned', 'Returned') }                          
                                { this.renderButton('Save') }
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default RentalsForm;