import React from 'react';
import Form from '../commom/form';
import Joi from 'joi-browser';
import { getRental, insert, update } from "../../services/vidly/rentalService";
import { getMovies } from "../../services/vidly/movieService";
import { getCustomers } from "../../services/vidly/userService";

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
        title:  `Rental a movie`
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
        console.log(id);
        const data = { ...this.state.data };
        const movies =  [{ id: 0, title: ''}, ...await getMovies()];
        const users = [{ id: 0, name: ''}, ...await getCustomers()];

        if (id) {
            const result = await getRental(id);
            console.log(result);
            if (!result) {
                this.props.history.push('/not-found');
            }

            data.userId = result.userId;
            data.movieId = result.movieId;
            data.returned = result.returned ? true : false;
            data.rentalDays = result.rentalDays;
            data.id = id;
        }

        const title =  id ?  `Edit a rental` : 'Insert a rental';
        this.setState({ title, data, movies, users });
    }
  
    render() {
        const id = this.props.match.params.id || null;
        return (   
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>{ this.state.title }</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-7 center m-2">                    
                        <form onSubmit={this.handleSubmit} className="m-1">
                            { this.renderSelect('userId', 'User', this.state.users, this.state.data.userId, 'id', 'name', this.state.data.userId)}
                            { this.renderSelect('movieId', 'Movies', this.state.movies, this.state.data.movieId, 'id', 'title', this.state.data.movieId)}
                            { this.renderInput('rentalDays', 'Rental Days', 'number') }
                            { this.renderCheckbox('returned', 'Returned') }                          
                            { this.renderButton('Register') }
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default RentalsForm;