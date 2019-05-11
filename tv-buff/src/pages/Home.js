//import React from 'react'
import React, { Component } from 'react';
//import Search from '../components/search/Search.js';

class Home extends Component{
  state = {
    err: null,
    isLoaded: false,
    items: []
  };

componentDidMount() {
  //http://api.tvmaze.com/singlesearch/shows?q=cops
  //http://api.tvmaze.com/search/people?q=lauren
  fetch("http://api.tvmaze.com/search/people?q=lauren")
    .then(res => res.json())
    .then(
      (res) => {
        
        this.setState({
          isLoaded: true,
          items: res,
        });
        console.log("Hi")
      },
      (err) => {
        this.setState({
          isLoaded: true,
          err
        });
      }
    )
}

render() {
  const { err, isLoaded, items } = this.state;
  if (err) {
    return <div>Error: {err.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else { 
    console.log(items)
    return (
      <div>
    
        {items.map(item => (
          
          <li key={item.person.id}>
            {item.person.name} 
          </li>
        ))}
      </div>
    );
  }
}
}

export default Home;

