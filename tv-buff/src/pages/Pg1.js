//import React from 'react'
import React, { Component } from 'react';
//import Search from '../components/search/Search.js';

class Pg1 extends Component{
  state = {
    err: null,
    isLoaded: false,
    items: []
  };

componentDidMount() {
  fetch("http://api.tvmaze.com/search/shows?q=cops")
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
    return (
      <div>
        {items.map(item => (
          
          <li key={item.show.id}>
            {item.show.name} l {item.show.rating.average}
          </li>
        ))}
      </div>
    );
  }
}
}

export default Pg1;

