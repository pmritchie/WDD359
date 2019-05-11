import React, { Component } from 'react';
import Search from '../components/search/Search.js';
import Nav from '../components/nav/Nav.js';

class Description extends Component{
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
            <h1>Descriptions Page</h1>
            </div>
        )
    }
}

export default Description;