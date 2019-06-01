import React, { Component } from 'react';

import Header from '../components/header/Header.js';
import Card from '../components/card/Card';
import defPic from '../components/images/default.jpeg';
class Favorites extends Component{
    state = {
        actors: [],
        shows: [],
        isLoaded: false,
        search: '',
        human: false
    }
    //load favorites
    componentDidMount(){
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        console.log(favorites)
        this.fetchData(favorites) 
    }
    fetchData = (query) => {
        let hArray = []
        let sArray = []
        
        query.forEach(function(data){
            if(data.human === true){
                  hArray.push(data) 
            }else{
                sArray.push(data)
            }
        })
        console.log(hArray)
        hArray.forEach((data) => { 
            fetch(`http://api.tvmaze.com/people/${data.id}?embed=castcredits`)
            .then((data) => {
                let output = data.json()
                return output
            }).then((stuff) => {
             //push object to array
                let data1 = [];
                data1.push(stuff) 
                
                data1.forEach((data) => {
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
              
              return bArray;
            }).then((stuff) => {
              console.log(stuff[0])
              this.setState(state =>   ( {actors: [...state.actors, stuff[0]]})  )
            })
        })

        sArray.forEach((data)=>{
            fetch(` http://api.tvmaze.com/shows/${data.id}`)
            .then((data) => {
                let output = data.json()
                return output
            }).then((stuff) => {
             //push object to array
                let data1 = [];
                data1.push(stuff) 
            
                data1.forEach((data)=>{
                    if(data.image == null || data.rating.average == null){
                      data.image = {medium: `${defPic}`, large: "./images/hikers.jpg"}
                      data.rating = {average: "N/A"}
                    }
                 })  
                let sArray = data1.map(show => ({
                    id: `${show.id}`,
                    name: `${show.name}`,
                    rating: `${show.birthday}`,
                    image: `${show.image.medium}`,
                    fav: true
              })) 
              
              return sArray;
            }).then((stuff) => {
              this.setState(state => ({shows: [...state.shows, stuff[0]]}))
             
                
            })
        })
        this.setState({isLoaded:true})       
      }

      addFav = (id,person) =>{
        const favorites = [...JSON.parse(localStorage.getItem('favorites'))];
        const actors = [...this.state.actors]
        const shows = [...this.state.shows]
        favorites.forEach(function(item, index){
          if(item.id === id){
            console.log(item.id)
            favorites.splice(index,1)
            }
        
        })
        actors.forEach(function(item, index){
          if(item.id === id){
            console.log(item.id)
            actors.splice(index,1)
            }
        })
        
        shows.forEach(function(item, index){
          if(item.id === id){
            console.log(item.id)
            shows.splice(index,1)
            }
        })
        localStorage.setItem('favorites', JSON.stringify(favorites));
        this.setState({actors: actors});
        this.setState({shows: shows});
        //resest actors here to refresh without refreshing page
        // window.location.reload();
      }

      detailed = (id,person) => {
        let dID = {dID:id, human:person}
        localStorage.setItem('description', JSON.stringify(dID))
        this.props.history.push('/Description')
      }

    render(){
        const { err, isLoaded, actors, shows } = this.state;
        if (err) {
          return <div>Error: {err.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else { 
          return (
            <div style={styles.div}>
              <Header />
              <div className="container" style={styles.hContainer}>   
              <div className="row mt-5 justify-content-center" style={styles.headerRow}>
                  <h1 className="col-6" style={styles.h1} >Favorites</h1>
              </div>
         
          </div>
              <h2 style={styles.h2}>People</h2>
              <section className="container">
                <div className="row">
                
                  {isLoaded && actors.length > 0 ? actors.map(actor => { const {id, name, birthday, image, fav} = actor; 
                    const person = true;
                    //console.log(id) 
                          return <Card 
                                  style={styles.card} 
                                  key={id} alt={name+" picture"} 
                                  birthday={birthday} 
                                  image={image} 
                                  title={name} 
                                  fav={fav}
                                  addFav={()=>this.addFav(id,person)} 
                                  detailed={()=>this.detailed(id,person)}
                            />
                        }): <h2>You haven't favorited anyone yet!</h2>
                  }
                </div>
              </section>
              <h2 style={styles.h2}>Shows</h2>
              <section className="container">
                <div className="row">
                
                {isLoaded && shows.length > 0 ? shows.map(show => { const {id, name, rating, image, fav} = show;  
                  const person = false;
                        return <Card 
                                style={styles.card} 
                                key={id} alt={name+" picture"} 
                                rating={"Rating: "+rating} 
                                image={image} 
                                title={name}
                                fav={fav}
                                addFav={()=>this.addFav(id,person)}
                                detailed={()=>this.detailed(id,person)}
                                />
                        }): <h2>You haven't favorited any shows yet!</h2>
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
    hieght: "100%",
    fontFamily: "'Freckle Face', cursive",
    color: "#F9D780",

},
section:{
    display: "grid",
},
card: {
  fontFamily: "'Freckle Face', cursive",
  color: "#F9D780",
    
},
header:{
  fontSize: "84px",
  justifyContent: "center",
  alignItems: "center"
},
headerCol:{
  justifyContent: "center",
  alignItems: "center",
  marginTop: "3rem"
},
searchCol: {
  marginTop: "1rem"
},
h2: {
  fontSize: "64px",
  marginTop: "10rem",
  marginLeft: "15rem"

},
hContainer:{
  width: "100%",
  marginTop: "5rem",
},
h1: {
  fontSize: "64px"
}
    
  }