import React, { Component } from 'react';

class Favorites extends Component{
    state = {
        actors: [],
        isLoading: true,
        search: '',
    }

    render(){
        return(
            <div>
            <h1>Favorites Page</h1>
            </div>
        )
    }
}

export default Favorites;