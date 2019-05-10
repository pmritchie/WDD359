import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom'
import Pg1 from './pages/Pg1'


function App() {
  return (
    <Router>
      <div>
        <section>
          <Route exact path='/' component={Pg1}/>
          <Route exact path='/Pg1' component={Pg1}/>
        </section>
      </div>
    </Router>
  );
}

export default App;
