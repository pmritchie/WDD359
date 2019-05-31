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
  console.log(v)
  e.preventDefault();
  //change v to array and split where spaces then at +
 
  //send local storage here to fetch data to check for favorites // turn heart red

  localStorage.setItem('search', JSON.stringify(v))
  //this.setState({search: v});
  this.fetchData(v);
}

componentDidMount() {
  //load data from localStorage here
  const storage = JSON.parse(localStorage.getItem('favorites'));
 
  if(storage === null){
    console.log("null")
    this.setState({favList: [{id:0, fav:false, human:false}]})
    localStorage.setItem('favorites',JSON.stringify([{id:0, fav:false, human:false}]))

  }else{
    console.log("not null")
    this.setState({favList: storage})
  }
 
  this.fetchData("Mimi")
}

fetchData(query){
  //fetch data twice, once for shows the other for actors
  Promise.all([
    fetch(`https://api.tvmaze.com/search/people?q=:${query}`,{method: 'get'}),
    fetch(`https://api.tvmaze.com/search/shows?q=:${query}`,{method: 'get'})
  ])
  .then(([prom1, prom2]) => {
    //convert into json
    let output = Promise.all([prom1.json(),prom2.json()]);
    return output;
  })
  .then(
    (stuff) => {
      let [data1,data2] = stuff;
      //loop through data to check for null value's replace with value
      data1.forEach(function(data){
         if(data.person.image == null){
           data.person.image = {medium: `${defPic}`, large: "./images/hikers.jpg"};
         }
      })
      data2.forEach(function(data){
        if(data.show.image == null || data.show.rating.average == null){
          data.show.image = {medium: `${defPic}`, large: "./images/hikers.jpg"};
          data.show.rating = {average: "N/A"};
        }
     })
     // create array of objects
      let pArray = data1.map(actor => ({
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
      }));
      for( let i = 0; i < sArray.length; i++ ){
        let tempA = [...this.state.favList]
        let check = sArray[i].id;
        for(let v = 0; v < tempA.length; v++){
          if(check === tempA[v].id){
            sArray[i].fav = true;
            console.log(sArray[i].fav)
          }
        }
      }
      for( let i = 0; i < pArray.length; i++ ){
        let tempA = [...this.state.favList]
        let check = pArray[i].id;
        for(let v = 0; v < tempA.length; v++){
          if(check === tempA[v].id){
            pArray[i].fav = true;
            console.log(sArray[i].fav)
          }
        }
      }

      return [pArray,sArray,];
    })
    .then(([actors,shows]) => this.setState({
      actors,
      shows,
      isLoaded:true
    }));
}
//function to add favorites to local storage
addFav = (id,person, e) => {
 
  console.log(e);
  //check state favList for items, if empty set localStorage and favList
  let favList = [...this.state.favList]
if(favList.length === 0){
      favList.push({id:id,human:person,fav:true});
      this.setState({favList});
      localStorage.setItem('favorites', JSON.stringify(favList));
      //redirect or not to direct 
}else{

  const storage = [...JSON.parse(localStorage.getItem('favorites'))];
  favList.forEach(function(item, index){
       if(item.id === id){
         favList.splice(index,1);
       }
    })
    storage.forEach(function(item, index){
      if(item.id === id){
        storage.splice(index,1);
      }
   })
        storage.push({id:id, human:person,fav:true});
        //console.log(storage);
        favList.push({id:id,human:person});
        this.setState({favList});
        localStorage.setItem('favorites', JSON.stringify(storage));
  
}

} 
detailed = (id,person) => {
  let dID = {dID:id, human:person};
  localStorage.setItem('description', JSON.stringify(dID));
  this.props.history.push('/Description');
}







render() {
  console.log(this.state.favList);
  console.log(JSON.parse(localStorage.getItem('favorites')));
  const { err, isLoaded, actors, shows, favList } = this.state;
  if (err) {
    return <div>Error: {err.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else { 
    return (
      <div style={styles.div}>
        <Header />
        <div className="container">
          <div className="row mt-5">
            <div className="col" style={styles.headerCol}>
              <h1 style={styles.header} >TV BUFF!</h1>
            </div>
            <div className="col" style={styles.searchCol} >
              <Search search={this.search} />
            </div>
          </div>
        </div>
        <h2 style={styles.h2}>People</h2>
        <section className="container">
          <div className="row">
          
            {isLoaded && actors.length > 0 ? actors.map(actor => { const {id, name, birthday, image, fav} = actor; 
              const person = true;
              //console.log() 
                    return <Card 
                            style={styles.card} 
                            key={id} alt={name+" picture"} 
                            birthday={birthday} 
                            image={image} 
                            title={name}
                            fav={fav}
                            addFav={(e)=>this.addFav(id,person,e)} 
                            detailed={()=>this.detailed(id,person)}
                            id={id}
                      />
                  }): null
            }
          </div>
        </section>
        <h2 style={styles.h2}>Shows</h2>
        <section className="container">
          <div className="row">
          
          {isLoaded && shows.length > 0 ? shows.map(show => { const {id, name, rating, image, fav} = show;  
            const person = false;
            favList.forEach(function(item){
              if(item.id === id){

              }
            })
          
                  return <Card 
                          style={styles.card} 
                          key={id} alt={name+" picture"} 
                          rating={"Rating: "+rating} 
                          image={image} 
                          title={name}
                          id={id}
                          fav={fav}
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

export default Home;

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
  
};
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
    