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
  localStorage.setItem('search', JSON.stringify(v))
  this.fetchData(v);
}

componentDidMount() {
  
  //load data from localStorage here
  const storage = JSON.parse(localStorage.getItem('favorites'));
  const search = JSON.parse(localStorage.getItem('search'));
  
  //checking if something has been searched, if it has load that info, if not, load from hardcode
  if(search === null){
      if(storage === null){
        this.setState({favList: [{id:null, fav:false, human:false}]})
        localStorage.setItem('favorites',JSON.stringify([{id:null, fav:false, human:false}]))
      }else{
        this.setState({favList: storage})
        }
        this.fetchData("Tom")
  }else{

    if(storage === null){
     
      this.setState({favList: [{id:null, fav:false, human:false}]})
      localStorage.setItem('favorites',JSON.stringify([{id:null, fav:false, human:false}]))
    }else{
      this.setState({favList: storage})
    }
    this.fetchData(search)
  }
  console.log(this.state.favList)
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
         if(data.person.image === null){
           data.person.image = {medium: `${defPic}`, large: "./images/hikers.jpg"};
         }
      })
      data2.forEach(function(data){
        if(data.show.image === null){
          data.show.image = {medium: `${defPic}`, large: "./images/hikers.jpg"};
          data.show.rating = {average: "N/A"};
        }
     })
     data2.forEach(function(data){
      if(data.show.rating.average === null){
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
      //check to see if the heart needs to be red or not
      for( let i = 0; i < sArray.length; i++ ){
        let tempA = [...this.state.favList]
        let check = sArray[i].id;
        for(let v = 0; v < tempA.length; v++){
          if(check === tempA[v].id){
            sArray[i].fav = true;
          }
        }
      }
      for( let i = 0; i < pArray.length; i++ ){
        let tempA = [...this.state.favList]
        let check = pArray[i].id;
        for(let v = 0; v < tempA.length; v++){
          if(check === tempA[v].id){
            pArray[i].fav = true;
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
addFav = (id,person) => {
  const favList = [...this.state.favList];
  const storage = [...JSON.parse(localStorage.getItem('favorites'))];
  const actors = [...this.state.actors];
  const shows = [...this.state.shows];
  //check state favList for items, if empty set localStorage and favList
if(favList.length <= 1){
      favList.push({id:id,human:person,fav:true});
      this.setState({favList});
      storage.push({id:id,human:person,fav:true})
}else{
    //check and see if it already exist if not add
    const idCheck = favList.some(el => el.id === id)
    if(idCheck === true){
      favList.forEach(function(item, index){
        if(item.id === id){
        favList.splice(index,1);
        }
      })
    }else{
      favList.push({id:id,human:person,fav:true});
    }
    //check and see if it already exists if not add
    const idShow = storage.some(el => el.id === id)
    if(idShow === true){
      storage.forEach(function(item, index){
        if(item.id === id){
          storage.splice(index,1);
        } 
      })
    }else{
      storage.push({id:id,human:person,fav:true})
    }
   
}
//these two check to if the heart is lit or not
  actors.forEach(function(item, index){
    if(item.id === id){
      if(item.fav === true){
        actors[index].fav = false;
      }else{
        actors[index].fav = true;
      }
      
    } 
  })
  shows.forEach(function(item, index){
    if(item.id === id){
      if(item.fav === true){
        shows[index].fav = false;
      }else{
        shows[index].fav = true;
      }  
    } 
  })
  this.setState({favList,shows,actors});
  localStorage.setItem('favorites', JSON.stringify(storage));
  
} 
detailed = (id,person) => {
  let dID = {dID:id, human:person};
  localStorage.setItem('description', JSON.stringify(dID));
  this.props.history.push('/Description');
}


render() {
  const { err, isLoaded, actors, shows, favList } = this.state;
  console.log(shows)
  if (err) {
    return <div>Error: {err.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else { 
    return (
      
      <div style={styles.div}>
      <Header />
        <div className="body">
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
 