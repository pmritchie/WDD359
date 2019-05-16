import React, {Component}from 'react';
import MyBtn from '../button/button'


class Search extends Component{
 state ={
     searchQuery: ''
 }
 //props = {} 

 render(){
     return (<form onSubmit={(e)=>this.props.search(e,this.state.searchQuery)}>
                 <input placeholder="Tom Cruise.."
                 onChange={(e)=>{this.setState({searchQuery: e.target.value})}}
                 name = 'search'
                 style={styles.input} 
                 />   
                 <MyBtn style={styles.btn} btnText="Search" type={"submit"} />
             </form>
             )
 }
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