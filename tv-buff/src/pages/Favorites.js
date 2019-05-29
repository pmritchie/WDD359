import React, { Component } from 'react';
import Search from '../components/search/Search.js';
import Header from '../components/header/Header.js';
class Favorites extends Component{
    state = {
        actors: [],
        isLoading: true,
        search: '',
    }
    //load favorites
    componentDidMount(){
        let favorites = JSON.parse(localStorage.getItem('favorites'))
        console.log(favorites)
        //this.fetchData(favorites) 
    }
 //
    render(){
        return(
            <div>
            <Header />
            <Search />
            <h1>Favorites Page</h1>
            </div>
        )
    }
}

export default Favorites;