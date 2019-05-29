import React, { Component } from 'react';
import Search from '../components/search/Search.js';
import Header from '../components/header/Header.js';
import defPic from '../components/images/default.jpeg';
class Favorites extends Component{
    state = {
        actors: {},
        shows: {},
        isLoaded: false,
        search: '',
        human: false
    }
    //load favorites
    componentDidMount(){
        let favorites = JSON.parse(localStorage.getItem('favorites'))
        console.log(favorites)
        //this.fetchData(favorites) 
    }
    fetchData(query){
        
        if(query.human === false){
            
            fetch(`https://api.tvmaze.com/shows/${query.dID}?embed[]=episodes&embed[]=cast`)
            .then(data => data.json())    
            .then(
                (stuff) => {
                let data = [];
                data.push(stuff)    
                data.forEach(function(data){
                    if(data.image == null || data.rating.average == null){
                      data.image = {medium: `${defPic}`, large: "./images/hikers.jpg"}
                      data.rating = {average: "N/A"}
                    }
                 })
                let sArray = data.map(show => ({
                    id: `${show.id}`,
                    name: `${show.name}`,
                    image: `${show.image.medium}`,
                    rating: `${show.rating.average}`,
                    summary: `${show.summary}`,
                    premiered: `${show.premiered}`,
                    fav: false
                  }))  
                 return sArray
            }).then((shows)=> this.setState({
                shows,
                isLoaded:true,
                human: false
            }))
        }else{
            
            fetch(`http://api.tvmaze.com/people/${query.dID}?embed=castcredits`)
            .then((data) => {
                let output = data.json()
                return output
            }).then((stuff) => {
                //push object to array
                let data1 = [];
                data1.push(stuff) 
                
                data1.forEach(function(data){
                    if(data.image == null){
                      data.image = {medium: `${defPic}`, large: "./images/hikers.jpg"}
                    }
                 })   
                data1.forEach(function(data){
                    if(data.image == null){
                      data.image = {medium: `${defPic}`, large: "./images/hikers.jpg"}
                    }
                 })
                let pArray = data1.map(actor => ({
                    id: `${actor.id}`,
                    name: `${actor.name}`,
                    birthday: `${actor.birthday}`,
                    image: `${actor.image.medium}`,
                    fav: false
                  })) 
                  return pArray;
                }).then((actors) => this.setState({
                    actors,
                    isLoaded:true,
                    human: true
                  }))
        }        
      }
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