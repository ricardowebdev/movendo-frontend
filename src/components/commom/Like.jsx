import React, { Component } from 'react';

class Like extends Component {
    render() { 
        return (
            <i className={this.props.liked ? 'fa fa-heart' : 'fa fa-heart-o'}
                onClick={() => this.props.onLike(this.props.liked)}
                style={{ cursor: 'pointer'}}
                >
            </i>
        );
    }
}
 
export default Like;