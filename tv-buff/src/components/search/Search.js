import React, { Component } from 'react';
import MyBtn from '../button/button';
import './Search.css';


class Search extends Component {
 state ={
   searchQuery: '',
 }
 // props = {}

 render() {
   return (
     <form style={styles.container} className="container" onSubmit={e => this.props.search(e, this.state.searchQuery)}>
       <h4 className="row" style={styles.hl}>search for show or actor</h4>
       <div className="row" style={styles.row1}>
         <input
           placeholder="Tom Cruise.."
           onChange={(e) => { this.setState({ searchQuery: e.target.value }); }}
           name="search"
           style={styles.input}
           className="col-5 textChange"
         />
         <MyBtn className="col-5" style={styles.btn} btnText="Search" type="submit" />
       </div>
     </form>
   );
 }
}
// #5B5F60,#93B1AF,#F9D780,#D5674C,#7F4134,#5B5F60,#93B1AF,#F9D780
export default Search;

const styles = {
  input: {
    borderRadius: '20px',
    border: 'solid black 1px',
    textIndent: '5%',
    height: '2rem',
    color: '#B849DF',
  },

  container: {
    border: '',
    borderRadius: '20px',
    width: '25rem',
    height: '6rem',
    margin: '2rem',
    display: 'grid',
    backgroundColor: 'white',
    opacity: '0.8',
    padding: '.5rem',

  },
  hl: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#F9D780',
    paddingTops: '.5rem',
  },
  btn: {
    width: '40px',
    height: '40px',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    border: 'none',
  },
  row1: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {

  },

};
