//import React from 'react'
import React, { Component } from 'react';
import Search from '../components/search/Search.js';
import Nav from '../components/nav/Nav.js';

class Home extends Component{
  state = {
    err: null,
    isLoaded: false,
    actors: '',
    shows: '',
    search: '',
  };
search = e => {
  this.setState({search: e.target.value})
  console.log(this.search)
}
componentDidMount() {
  Promise.all([
  //http://api.tvmaze.com/singlesearch/shows?q=cops
  //http://api.tvmaze.com/search/people?q=lauren
  fetch("http://api.tvmaze.com/search/people?q=lauren",{method: 'get'}),
  fetch("http://api.tvmaze.com/search/shows?q=girls",{method: 'get'})
])
    .then(([res1, res2])=> Promise.all([res1.json(),res2.json()]))
    .then(
      ([data1, data2]) => {this.setState({
        actors: data1,
        shows: data2,
        isLoaded: true,
        
      })});
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
        <Nav />
        <Search search={this.search} />
        {actors.map(actor => (
          <li key={actor.person.id}>
            {actor.person.name} 
          </li>
        ))}
        {shows.map(show => (
          <li key={show.show.id}>
            {show.show.name} 
          </li>
        ))}
      </div>
    );
  }
}
}

export default Home;

