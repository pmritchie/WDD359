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
      margin: '0 1em',
      borderRadius: '20px',
      border: 'none',
      textIndent: '5%',
      height: '30%'
    },
   
}  