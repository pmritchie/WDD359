import React, { Component } from 'react';
import Header from '../components/header/Header.js';
import defPic from '../components/images/default.jpeg';
import Card from '../components/card/Card';


class Description extends Component {
    state = {
      actors: [],
      shows: [],
      isLoaded: false,
      search: '',
      human: false,
      cast: [],
      credits: [],
    }

    componentDidMount() {
      const detailed = JSON.parse(localStorage.getItem('description')) || [];
      console.log(detailed);
      if (detailed.length === 0) {
        this.setState({ isLoaded: true });
      } else { this.fetchData(detailed); }
    }

    fetchData(query) {
      // check to see if human or false for layout
      if (query.human === false) {
        console.log('showtime');
        fetch(`https://api.tvmaze.com/shows/${query.dID}?embed[]=episodes&embed[]=cast`)
          .then(data => data.json())
          .then(
            (stuff) => {
              const data = [];
              const cArray = [];
              data.push(stuff);
              data.forEach((data) => {
                if (data.image == null) {
                  data.image = { medium: `${defPic}`, large: './images/hikers.jpg' };
                }
                if (data.rating.average == null) {
                  data.rating = { average: 'N/A' };
                }
                // had to forLoop to get into cast array
                for (let i = 0; i < data._embedded.cast.length; i++) {
                  console.log(data._embedded.cast[i].person.image);
                  if (data._embedded.cast[i].person.image == null) {
                    data._embedded.cast[i].person.image = { medium: `${defPic}`, large: './images/hikers.jpg' };
                  }
                }
                const c2Array = data._embedded.cast.map(actor => ({
                  id: `${actor.person.id}`,
                  name: `${actor.person.name}`,
                  image: `${actor.person.image.medium}`,
                }));
                cArray.push(c2Array);
              });
              const sArray = data.map(show => ({
                id: `${show.id}`,
                name: `${show.name}`,
                image: `${show.image.medium}`,
                rating: `${show.rating.average}`,
                summary: `${show.summary}`,
                premiered: `${show.premiered}`,
                fav: false,
              }));
              return [sArray, cArray];
            },
          ).then(([shows, cast]) => this.setState({
            shows,
            cast,
            isLoaded: true,
            human: false,
          }));
      } else {
        // Change api over too - http://api.tvmaze.com/people/1/castcredits?embed=show
        fetch(`https://api.tvmaze.com/people/${query.dID}?embed=castcredits`)
          .then((data) => {
            const output = data.json();
            return output;
          }).then((stuff) => {
            // push object to array
            const data1 = [];
            data1.push(stuff);
            const push = [];
            data1.forEach((data) => {
              if (data.image === null) {
                data.image = { medium: `${defPic}`, large: './images/hikers.jpg' };
              }
              data1.forEach((data) => {
                if (data.country === null) {
                  data.country = { name: 'United States', code: 'US', timezone: 'America/Los_Angeles' };
                }
              });
              // for loop to get into credits
              for (let i = 0; i < data._embedded.castcredits.length; i++) {
                const showData = data._embedded.castcredits[i]._links.show.href.split('/');
                const showID = showData.pop();
                fetch(`https://api.tvmaze.com/shows/${showID}`, { method: 'get' })
                  .then((data) => {
                    const output = data.json();
                    return output;
                  }).then((stuff) => {
                    if (stuff.image === null) {
                      stuff.image = { medium: `${defPic}`, large: './images/hikers.jpg' };
                    }
                    const temp = [];
                    temp.push(stuff);
                    const sArray = temp.map(show => ({
                      id: `${show.id}`,
                      name: `${show.name}`,
                      image: `${show.image.medium}`,
                    }));
                    return sArray;
                  }).then((cast) => {
                    push.push(cast);
                  });
              }
            });
            const pArray = data1.map(actor => ({
              id: `${actor.id}`,
              name: `${actor.name}`,
              birthday: `${actor.birthday}`,
              image: `${actor.image.medium}`,
              country: `${actor.country.name}`,
              fav: false,
            }));

            return [pArray, push];
          }).then(([actors, credits]) => this.setState({
            actors,
            credits,
            isLoaded: true,
            human: true,
          }));
      }
    }

      detailed = (id, person) => {
        const dID = { dID: id, human: person };
        localStorage.setItem('description', JSON.stringify(dID));
        // reload page for new description
        window.location.reload();
      }

      render() {
        const {
          err, isLoaded, actors, shows, human, cast, credits,
        } = this.state;
        console.log(credits);
        console.log(cast);
        if (err) {
          return (
            <div>
Error:
              {err.message}
            </div>
          );
        } if (!isLoaded) {
          return <div>Loading...</div>;
        }
        return (
          <div style={styles.div}>
            <Header />
            <div className="container" style={styles.hContainer}>
              <div className="row mt-5 justify-content-center" style={styles.headerRow}>
                <h1 className="col-6" style={styles.h1}>Descriptions Page</h1>
              </div>
            </div>
            {human && actors.length > 0 ? actors.map((actor) => {
              const {
                name, birthday, image, country, id,
              } = actor;
              return (
                <section className="container" style={styles.showC}>
                  <div className="row m-3">
                    <section className="col">
                      <span><img id={id} src={image} alt={`${name} picture`} /></span>
                    </section>
                    <section className="col">
                      <h2>{name}</h2>
                      <p>
Birthday:
                        {birthday}
                      </p>
                      <p>
Country:
                        {country}
                      </p>
                    </section>
                  </div>
                  <div className="row mt-5">
                    <section className="container">
                      <div className="row justify-content-center">
                        <h3>Cast Credits</h3>
                      </div>
                      <div className="row ">
                        {
                                            // will not loop.. array inception going on here
                                            credits.map((show) => {
                                              const person = false;
                                              const { id, name, image } = show;
                                              return (
                                                <Card
                                                  style={styles.card}
                                                  alt={`${name}picture`}
                                                  key={id}
                                                  image={image}
                                                  title={name}
                                                  id={id}
                                                  addFav={() => this.addFav(id, person)}
                                                  detailed={() => this.detailed(id, person)}
                                                />
                                              );
                                            })
                                        }

                      </div>
                      <div className="row" />
                    </section>
                  </div>
                </section>
              );
            }) : null
                    }

            {!human && shows.length > 0 ? shows.map((show) => {
              const {
                id, name, summary, premiered, rating, image,
              } = show;
              return (
                <section className="container" style={styles.showC}>
                  <div className="row m-3">
                    <section className="col">
                      <span><img id={id} src={image} alt={`${name} picture`} /></span>
                    </section>
                    <section className="col">
                      <h2>{name}</h2>
                      <p>
Premiered:
                        {premiered}
                      </p>
                      <p>
Rating:
                        {rating}
                      </p>
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
                        <h3>Cast</h3>
                      </div>
                      <div className="row ">
                        { // display cards for actors on show
                                            cast[0].map((actor) => {
                                              const person = true;
                                              const { id, name, image } = actor;
                                              console.log(actor);
                                              return (
                                                <Card
                                                  style={styles.card}
                                                  alt={`${name}picture`}
                                                  key={id}
                                                  image={image}
                                                  title={name}
                                                  id={id}
                                                  addFav={e => this.addFav(id, person)}
                                                  detailed={() => this.detailed(id, person)}
                                                />
                                              );
                                            })
                                        }

                      </div>
                      <div className="row" />
                    </section>
                  </div>
                </section>
              );
            }) : null

                    }
          </div>

        );
      }
}

export default Description;

const styles = {
  div: {
    display: 'grid',

    fontFamily: "'Freckle Face', cursive",
    color: '#F9D780',

  },
  hContainer: {
    width: '100%',
    marginTop: '5rem',
    marginBottom: '5rem',
  },
  showC: {
    backgroundColor: 'white',
    opacity: '.9',
    justifyContent: 'center',
    alignContent: 'center',
    padding: '2rem',
    borderRadius: '15px',
    maxWidth: '70%',
  },
  img: {
    maxWidth: '10rem',
    maxHeight: 'rem',
  },
  hRow: {
    marginTop: '10rem',
    justifyContent: 'center',
  },
  nav: {
    marginBottom: '20rem',
  },
  h1: {
    fontSize: '64px',
  },
  card: {
    fontFamily: "'Freckle Face', cursive",
    color: '#F9D780',

  },


};
