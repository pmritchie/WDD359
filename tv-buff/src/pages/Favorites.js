import React, { Component } from 'react';

import Header from '../components/header/Header.js';
import Card from '../components/card/Card';
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
        //console.log(favorites)
        this.fetchData(favorites) 
    }
    fetchData(query){
        let hArray = []
        let sArray = []
        let humanArray = []
        let showArray = []
        let bob = 0;
        let sally = 0;
        query.forEach(function(data){
            if(data.human === true){
                  hArray.push(data) 
            }else{
                sArray.push(data)
            }
        })

        hArray.forEach(function(data){
            fetch(`http://api.tvmaze.com/people/${data.id}?embed=castcredits`)
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
                let bArray = data1.map(actor => ({
                    id: `${actor.id}`,
                    name: `${actor.name}`,
                    birthday: `${actor.birthday}`,
                    image: `${actor.image.medium}`,
                    fav: true
              })) 
              bob += 1
              return bArray;
              

            }).then((stuff)=>{
                // index resest every load
                stuff.forEach(function(data){
                    humanArray.push(data)
                })
                
            })
        })

        sArray.forEach(function(data){
            fetch(` http://api.tvmaze.com/shows/${data.id}`)
            .then((data) => {
                let output = data.json()
                return output
            }).then((stuff) => {
             //push object to array
                let data1 = [];
                data1.push(stuff) 
            
                data1.forEach(function(data){
                    if(data.image == null || data.rating.average == null){
                      data.image = {medium: `${defPic}`, large: "./images/hikers.jpg"}
                      data.rating = {average: "N/A"}
                    }
                 })  
                sArray = data1.map(show => ({
                    id: `${show.id}`,
                    name: `${show.name}`,
                    rating: `${show.birthday}`,
                    image: `${show.image.medium}`,
                    fav: true
              })) 
              
              return sArray;
            }).then((stuff)=> {
                stuff.forEach(function(data, index){
                    showArray[index] = data;
                })
                
            })
        })
        //console.log(showArray)

        this.setState({actors: humanArray, shows:showArray, isLoaded:true})

        
        
              
      }
    render(){
        const { err, isLoaded, actors, shows } = this.state;
        console.log(actors)
        if (err) {
          return <div>Error: {err.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else { 
          return (
            <div style={styles.div}>
              <Header />
              <h2>People</h2>
              <section className="container">
                <div className="row">
                
                  {isLoaded && actors.length >= 0 ? actors.map(actor => { const {id, name, birthday, image} = actor; 
                    const person = true;
                    //console.log(id) 
                          return <Card 
                                  style={styles.card} 
                                  key={id} alt={name+" picture"} 
                                  birthday={birthday} 
                                  image={image} 
                                  title={name} 
                                  addFav={()=>this.addFav(id,person)} 
                                  detailed={()=>this.detailed(id,person)}
                            />
                        }): null
                  }
                </div>
              </section>
              <h2>Shows</h2>
              <section className="container">
                <div className="row">
                
                {isLoaded && shows.length > 0 ? shows.map(show => { const {id, name, rating, image} = show;  
                  const person = false;
                        return <Card 
                                style={styles.card} 
                                key={id} alt={name+" picture"} 
                                rating={"Rating: "+rating} 
                                image={image} 
                                title={name}
                                addFav={()=>this.addFav(id,person)}
                                detailed={()=>this.detailed(id,person)}
                                />
                        }): null
                }
                  </div>
              </section>
            </div>
          );
        }
    }
}

export default Favorites;
const styles = {
    div: {
        display: "grid",
        backgroundSize: '100%',
        width: "100%",
        hieght: "100%"
    },
    section:{
        display: "grid"
    },
    card: {
        margin: ".5rem",
        padding: ".5",
        maxWidth: "400"
  
    }
    
  }