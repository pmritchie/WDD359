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
 favorites(){
    //  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    //  favorites.forEach(function(favorite){
    //     document.getElementById(favorite).className ="fav";
    //  })
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