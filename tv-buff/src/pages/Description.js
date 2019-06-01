import React, { Component } from 'react';
import Header from '../components/header/Header.js';
import hikers from '../components/images/hikers.jpg';
import defPic from '../components/images/default.jpeg';


class Description extends Component{
    state = {
        actors: [],
        shows: [],
        isLoaded: false,
        search: '',
        human: false,
        cast: [],
    }
    componentDidMount(){
        let detailed = JSON.parse(localStorage.getItem("description")) || [];
        console.log(detailed)
        if(detailed.length === 0){
            this.setState({isLoaded: true})
        }else{this.fetchData(detailed) }
        
    }

    fetchData(query){
        if(query.human === false){
            //Promise.all([])
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
            //Change api over too - http://api.tvmaze.com/people/1/castcredits?embed=show
            fetch(`https://api.tvmaze.com/people/${query.dID}?embed=castcredits`)
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
        
        const { err, isLoaded, actors, shows, human} = this.state;
        console.log(actors.length)
        if (err) {
            return <div>Error: {err.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return(
                <div style={styles.div}>
                    <Header />                
                    <div className="container" style={styles.hContainer}>   
                        <div className="row mt-5 justify-content-center" style={styles.headerRow}>
                            <h1 className="col-6" style={styles.h1}  >Descriptions Page</h1>
                        </div>
                    </div>
                    {human && actors.length > 0 ? actors.map(actor => {
                            const{ name, birthday, image,} = actor;
            
                            return(
                                
                                    <section className="container ml-5" >
                                        
                                        <div className="row">
                                            <section className="col">
                                                <span><img  src={image}></img></span>
                                            </section>
                                            <section className="col">
                                                <h2 >{name}</h2>
                                                <p>Birthday: {birthday}</p>
                                            </section>
                                        </div>
                                        <div className="row">
                                            <section className="col">
                                                <p>{birthday}</p>
                                            </section>
                                            <section className="col">
                                                <section className="container">
                                                    <div className="row">
                                                        <h3>Related Content</h3>
                                                    </div>
                                                    <div className="row">
                                                        <span>
                                                            <a href="#/"><img alt="hikers" src={hikers} style={styles.img}/>link</a>
                                                         </span>
                                                    </div>
                                                    <div className="row">
                                                    </div>
                                                </section>
                                            </section>
                                        </div>
                                    </section>
                                
                    )
            
                        }) :null 
                    }
              
                    {!human && shows.length > 0 ? shows.map(show => {
                        const{id, name, summary, premiered, rating, image} = show;
                        return(
                            <section className="container" style={styles.showC}>
                                <div className="row m-3">
                                    <section className="col">
                                        <span><img id={id} src={image}></img></span>
                                    </section>
                                    <section className="col">
                                        <h2>{name}</h2>
                                        <p>Premiered: {premiered}</p>
                                        <p>Rating: {rating}</p>
                                    </section>
                                </div>
                                <div className="row">
                                    <section className="col">
                                        <p style={styles.p}>
                                        {summary}
                                        </p>
                                    </section>
                                </div>
                                <div className="row mt-5">
                                    <section className="container">
                                        <div className="row justify-content-center">
                                            <h3>Related Content</h3>
                                        </div>
                                        <div className="row ">
                                            <span>
                                            
                                                    <a href="#/">
                                                    <img alt="hikers" src={hikers} style={styles.img}/>
                                                    link
                                                    </a>
                                            </span>
                                        </div>
                                        <div className="row"></div>
                                    </section>
                                </div>                                
                        </section>
                   
                    )
            
                  }) :null
                  
                }
                </div>
               
                )
                 
            }        
            }
            
            
    }

export default Description;

const styles = {
    div: {
        display: "grid",
       
        fontFamily: "'Freckle Face', cursive",
        color: "#F9D780",
        
    },
    hContainer:{
        width: "100%",
        marginTop: "5rem",
        marginBottom: "5rem"
    },
    showC :{
        backgroundColor: "white",
        opacity: '.9',
        justifyContent: "center",
        alignContent: "center",
        padding: "2rem",
        borderRadius: "15px",
        maxWidth: "70%"
    },
    img: {
        maxWidth: "10rem",
        maxHeight: "rem"
    },
    hRow: {
        marginTop:"10rem",
        justifyContent: "center"
    },
    nav:{
        marginBottom: "20rem"
    },
    h1:{
        fontSize: "64px"
    }

    
}