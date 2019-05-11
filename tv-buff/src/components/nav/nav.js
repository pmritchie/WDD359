import React from 'react';
import { NavLink } from 'react-router-dom'

const Nav = props => {
    return(
        <nav style={styles.container}>
            <NavLink to="/Home" style={styles.btn}>Home</NavLink>
            <NavLink to="/Favorites" style={styles.btn}>Favorites</NavLink>
            <NavLink to="/Description" style={styles.btn}>Description</NavLink>
        </nav>
    )
}

export default Nav;

const styles = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      color: 'black', 
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    btn: {
      margin :'.5rem',
      backgroundColor:'blue',
      color: 'white',
      fontFamily: " 'Indie Flower', cursive",
      fontSize: '1.5rem',
      border: '.05rem solid white',
      boxShadow: '10px 10px 2px 1px #0A100D'
    }
  }