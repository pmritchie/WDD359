import React from 'react';
import { NavLink } from 'react-router-dom'

const Nav = props => {
    return(
        <nav style={styles.container}>
            <NavLink to="/Pg1" style={styles.btn}>Home</NavLink>
            <NavLink to="/Favorites" style={styles.btn}>Favorites</NavLink>
            <NavLink to="/Description" style={styles.btn}>Description</NavLink>
        </nav>
    )
}

export default Nav;

const styles = {
    container: {
      flexDirection: 'row',
      color: 'white', 
      justifyContent: 'space-between',
      margin: '1rem',
      alignItems: 'center'
    },
    btn: {
      margin :'.5rem',
      backgroundColor:'transparent',
      color: 'white',
      fontFamily: " 'Indie Flower', cursive",
      fontSize: '1.5rem',
      border: '.05rem solid white',
      boxShadow: '10px 10px 2px 1px #0A100D'
    }
  }