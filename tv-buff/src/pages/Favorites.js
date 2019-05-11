import React, { Component } from 'react';
import Search from '../components/search/Search.js';
import Nav from '../components/nav/Nav.js';
class Favorites extends Component{
    state = {
        actors: [],
        isLoading: true,
        search: '',
    }

    render(){
        return(
            <div>
            <Nav />
            <Search />
            <h1>Favorites Page</h1>
            </div>
        )
    }
}

export default Favorites;