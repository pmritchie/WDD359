import React from 'react';
import MyBtn from '../button/button'

const Search = props => {
    return(
        <form onSubmit={props.search}>
            <input placeholder="Tom Cruise.."
            name = 'search'
            style={styles.input} 
            onChange={props.search}/>   
            <MyBtn style={styles.btn} btnText="Search" />
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
    btn:{
        MozBoxShadow:'inset 0px 0px 15px 3px #A22C29',
        WebkitBoxShadow:'inset 0px 0px 15px 3px #A22C29',
        boxShadow:'inset 0px 0px 15px 3px #A22C29',
        backgroundColor:'transparent',
        MozBorderRadius:'17px',
        WebkitBorderRadius:'17px',
        borderRadius:'17px',
        border:'1px solid #1f2f47',
        display:'inline-block',
        cursor:'pointer',
        color:'#ffffff',
        fontRamily:'Arial',
        fontRize:'15px',
        padding:'6px 13px',
        textDecoration:'none',
        textShadow:'0px 1px 0px #263666',
      },
}  