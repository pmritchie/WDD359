import React, { Component } from 'react';
import Search from '../components/search/Search.js';
import Header from '../components/header/Header.js';
import Card from '../components/card/Card';
import hikers from '../components/images/hikers.jpg';
import defPic from '../components/images/default.jpeg';


class Description extends Component{
    state = {
        actors: {},
        shows: {},
        isLoading: true,
        search: '',
    }
    componentDidMount(){
        let detailed = JSON.parse(localStorage.getItem("description"))
       //console.log(detailed)
        this.fetchData(detailed)
        //axios.get(`https://api.tvmaze.com/shows/${}?embed[]=episodes&embed[]=cast`)
       
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
                    fav: false
                  }))  
                 // console.log(sArray)
            })
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
                  console.log(pArray)
           
        
            })
              
            
            // .then((actors) => this.se)

        }        
      }
   // http://api.tvmaze.com/shows/1?embed[]=episodes&embed[]=cast
    render(){
       
        return(
            <div style={styles.div}>
                <Header />
                <Search />
                <section className="container" >
                    <div className="row">
                        <h1>Descriptions Page</h1>
                    </div>
                    <div className="row">
                        <section className="col">
                            <Card />
                        </section>
                        <section className="col">
                            <h2>Words Words</h2>
                            <p>First Aired: 12/12/12</p>
                        </section>
                    </div>
                    <div className="row">
                        <section className="col">
                            <p>
                            a lot of words and more words and 
                            more words and more words and more 
                            words and more words and more words 
                            and more words and more words and
                             more words
                            and more wordsand more wordsand more words
                            and more wordsand more wordsand more words
                            and more wordsand more wordsand more words
                            </p>
                        </section>
                        <section className="col">
                            <section className="container">
                                <div className="row">
                                    <h3>Related Content</h3>
                                </div>
                                <div className="row">
                                    <span >
                                        
                                        <a href="#/">
                                        <img alt="hikers" src={hikers} style={styles.img}/>
                                        link
                                        </a>
                                    </span>
                                </div>
                                <div className="row"></div>
                            </section>
                        </section>
                    </div>
                </section>
            </div>
        )
    }
}

export default Description;

const styles = {
    div: {
        display: "grid",
        backgroundSize: '100%',
        width: "100%",
        hieght: "100%"
    },
    card: {
        margin: ".5rem",
        padding: ".5"
    },
    img: {
        maxWidth: "10rem",
        maxHeight: "rem"
    }
    
}