import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './pages/Home'
import Favorites from './pages/Favorites';
import Description from './pages/Description';



function App() {
  return (
    <Router>
      <div>
        <section>
          <Route exact path='/' component={Home}/>
          <Route exact path='/Home' component={Home}/>
          <Route exact path='/Favorites' component={Favorites}/>
          <Route exact path='/Description' component={Description}/>
        </section>
      </div>
    </Router>
  );
}

export default App;
