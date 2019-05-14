
import React, { Component } from 'react';
import Search from '../components/search/Search.js';
import Header from '../components/header/Header.js';
import Card from '../components/card/Card'

class Home extends Component{
  state = {
    err: null,
    isLoaded: false,
    //actors and shows need to be made into objects
    actors: [],
    shows: [],
    search: '',
  };
search = e => {
  e.preventDefault()
  this.setState({search: e.target.value})
  console.log(this.state.search)
  this.fetchData()
  //console.log(this.state.search)
}
//fetch data twice, once for shows the other for actors
componentDidMount() {
  this.fetchData()
}
fetchData(){
  Promise.all([
    fetch(`http://api.tvmaze.com/search/people?q=:${this.state.search}`,{method: 'get'}),
    fetch(`http://api.tvmaze.com/search/shows?q=:${this.state.search}`,{method: 'get'})
  ])
      .then(([res1, res2])=> Promise.all([res1.json(),res2.json()]))
      .then(
        //make actors and shows into objects i.e. ${data1.person}
        ([data1, data2]) => {this.setState({
          actors: data1,
          shows: data2,
          isLoaded: true,
        })
      },
      (err) => {
        this.setState({
          isLoaded: false,
          err
        });
      }
      );

}

render() {
  const { err, isLoaded, actors, shows } = this.state;
  if (err) {
    return <div>Error: {err.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else { 
    //console.log(actors)
    return (
      <div>
        <Header />
        <Search search={this.search} />
        {actors.map(actor => { const {id, alt, image, title }
          <Card id={actor.person.id} alt={actor.person.name+" picture"} image={actor.person.image.medium} title={actor.person.name}/>
          // <li key={actor.person.id}>
          //   <p>{actor.person.name}</p>
            
          // </li>
        })}
        {shows.map(show => (
          <li key={show.show.id}>
            <p>{show.show.name}</p>
           
          </li>
        ))}
      </div>
    );
  }
}
}

export default Home;

 // <img src={show.show.image.medium} />
            // <a></a>