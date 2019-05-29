import React from 'react';
import Navigation from '../nav/Nav'

const Header = props => {
    return(
            <header style={styles.container}>
                <Navigation/>
            </header>
       
    )
}

export default Header;

const styles = {
    container: {
        backgroundColor: "#6c757d",
        minHeight: "3rem"
      }
}