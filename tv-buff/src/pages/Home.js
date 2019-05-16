import React, { Component } from 'react';
import Search from '../components/search/Search.js';
import Header from '../components/header/Header.js';
import Card from '../components/card/Card'

class Home extends Component{
  state = {
    err: null,
    isLoaded: false,
    //actors and shows need to be made into objects
    actors: {},
    shows: {},
    search: '',
  };
search = (e,v) => {
  e.preventDefault()
  this.setState({search: v})
  console.log(this.state.search)
  this.fetchData(v)
  //console.log(this.state.search)
}
//fetch data twice, once for shows the other for actors
componentDidMount() {
  this.fetchData()
}
fetchData(query){
  Promise.all([
    fetch(`http://api.tvmaze.com/search/people?q=:${query}`,{method: 'get'}),
    fetch(`http://api.tvmaze.com/search/shows?q=:${query}`,{method: 'get'})
  ])
      .then(([res1, res2]) => Promise.all([res1.json(),res2.json()]))
      .then(
        
        //make actors and shows into objects i.e. ${data1.person}
        ([data1, data2]) => ([data1.map(actor => ({
          id: `${actor.person.id}`,
          name: `${actor.person.name}`,
          birthday: `${actor.person.birthday}`,
          image: `${actor.person.image.medium}`

        }))],[data2.res2.map(show => ({
          id: `${show.show.id}`,
          name: `${show.show.name}`,
          summary: `${show.show.summary}`,
          image: `${show.show.image.medium}`
        }))]).then(([actors,shows]) => this.setState({
          actors,
          shows,
          isLoaded:true
        })),
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


        {isLoaded && actors.length > 0 ? actors.map(actor => { const {id, name, birthday, image} = actor;  
          return <Card key={id} alt={name+" picture"} birthday={birthday}image={image} title={name}/>
        }): null
      }
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