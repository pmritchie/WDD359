import React from 'react';

const Search = props => {
    return(
        <form>
            <input placeholder="Search"
            style={styles.input} />
        </form>
    )
}

export default Search;

const styles= {
    input: {
      margin: '1rem',
      borderRadius: '20px',
      border: 'solid black 1px',
      textIndent: '5%',
      height: '2rem'
    },
}  