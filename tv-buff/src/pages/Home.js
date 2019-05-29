import React, { Component } from 'react';
import Search from '../components/search/Search.js';
import Header from '../components/header/Header.js';
import Card from '../components/card/Card';
import defPic from '../components/images/default.jpeg';



class Home extends Component{
  state = {
    err: null,
    isLoaded: false,
    //actors and shows need to be made into objects
    actors: {},
    shows: {},
    search: '',
    favList: [],
    dID: '',
  };
  
search = (e,v) => {
  e.preventDefault()
  this.setState({search: v})
  //console.log(this.state.search)
  this.fetchData(v)
  //console.log(this.state.search)
}
//fetch data twice, once for shows the other for actors
componentDidMount() {
  this.fetchData("Drew")
}

fetchData(query){
  Promise.all([
    fetch(`https://api.tvmaze.com/search/people?q=:${query}`,{method: 'get'}),
    fetch(`https://api.tvmaze.com/search/shows?q=:${query}`,{method: 'get'})
  ])
  .then(([prom1, prom2]) => {
    //convert into json
    let output = Promise.all([prom1.json(),prom2.json()])
    return output;
  })
  .then(
    (stuff) => {
      let [data1,data2] = stuff;
      data1.forEach(function(data){
         if(data.person.image == null){
           data.person.image = {medium: `${defPic}`, large: "./images/hikers.jpg"}
         }
      })
      data2.forEach(function(data){
        if(data.show.image == null || data.show.rating.average == null){
          data.show.image = {medium: `${defPic}`, large: "./images/hikers.jpg"}
          data.show.rating = {average: "N/A"}
        }
     })
      //console.log(data1)
      data2.filter(Boolean)
      
     // make local copy of localStorage
      //let favs = JSON.parse(localStorage.getItem('favorites')) || [];


      let pArray = data1.filter(Boolean).map(actor => ({
        id: `${actor.person.id}`,
        name: `${actor.person.name}`,
        birthday: `${actor.person.birthday}`,
       image: `${actor.person.image.medium}`,
       fav: false
      }));
      let sArray = data2.map(show => ({
        id: `${show.show.id}`,
        name: `${show.show.name}`,
        rating: `${show.show.rating.average}`,
        image: `${show.show.image.medium}`,
        fav: false
      }))
      if(pArray[0].id === 2418){
          pArray[0].fav = true;
          console.log(pArray[0].fav)
      }
      return [pArray,sArray,];
    })
    .then(([actors,shows]) => this.setState({
      actors,
      shows,
      isLoaded:true
    }))
  
        
        
}
//function to add favorites to local storage
addFav = (id,person) => {
  let favList = [...this.state.favList]
  
  console.log(favList)
if(favList.length === 0){
  favList.push({id:id,human:person})
      this.setState({favList})
      localStorage.setItem('favorites', JSON.stringify(favList))
      //redirect
}else{
  favList.forEach(function(item, index){
       if(item.id === id){
         favList.splice(index,1)
       }
    })
        favList.push({id:id,human:person})
        this.setState({favList})
        localStorage.setItem('favorites', JSON.stringify(favList))
  
}

} 
detailed = (id,person)=> {
  let dID = {dID:id, human:person}
  localStorage.setItem('description', JSON.stringify(dID))
  this.props.history.push('/Description')
}







render() {
  
  const { err, isLoaded, actors, shows } = this.state;
  //console.log(actors)
  if (err) {
    return <div>Error: {err.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else { 
    return (
      <div style={styles.div}>
        <Header />
        <Search search={this.search} />
        <h2>People</h2>
        <section className="container">
          <div className="row">
          
            {isLoaded && actors.length > 0 ? actors.map(actor => { const {id, name, birthday, image} = actor; 
              const person = true;
              //console.log() 
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
          
          {isLoaded && actors.length > 0 ? shows.map(show => { const {id, name, rating, image} = show;  
            const person = false;
                  return <Card 
                          style={styles.card} 
                          key={id} alt={name+" picture"} 
                          rating={"Rating: "+rating} 
                          image={image} 
                          title={name}
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

export default Home;

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
 // <img src={show.show.image.medium} />
            // <a></a>
            // {shows.map(item => {
            //   console.log(item);
            //   return(
            //     <li key={item.id}>
            //       <p>{item.name}</p>
            //     </li>
            //   )})}



///////////////////////////////////////////////////////////
// parsePeople(peopleData) { 
//   console.log("parsingPeople:",peopleData)
//     return peopleData.map(actor => ({
//       id: `${actor.person.id}`,
//       name: `${actor.person.name}`,
//       birthday: `${actor.person.birthday}`,
//       image: `${actor.person.image.medium}`
//     }));
// }

// parseShows(showData) {
//   console.log('parsingShows:',showData);
//   return showData.map(show => ({
//     id: `${show.show.id}`,
//     name: `${show.show.name}`,
//     summary: `${show.show.summary}`,
//     image: `${show.show.image.medium}`,
//   }))
// } 
//////////////////////////////////////////////////
  // ,
    //   (err) => {
    //     this.setState({
    //       isLoaded: false,
    //       err
    //     });
    /////////////////////////
         //  }else{
      //   console.log(item.id, index)
      //   favList.push({id:id,human:person})
      //   this.setState({favList})
      //   localStorage.setItem('favorites', JSON.stringify(favList))
      //  }
    