import React, {Component} from 'react';
import { NavLink as RRNavLink} from 'react-router-dom'

import { Nav, NavItem, NavLink } from 'reactstrap';


export default class Navigation extends Component{
  
 state={
   active: false,
 }

  render() {

    return (
        <div>
          <Nav tabs>
            <NavItem>
              <NavLink activeClassName="active" tag={RRNavLink} to="/Home">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink activeClassName="active" tag={RRNavLink} to="/Favorites">Favorites</NavLink>
            </NavItem>
            <NavItem>
              <NavLink activeClassName="active" tag={RRNavLink} to="/Description">Description</NavLink>
            </NavItem>
          </Nav>
        </div>
      
    );
  }
}




// const styles = {
   
//     btn: {
//       margin :'.5rem',
//       padding: ".5rem",
//       backgroundColor:'blue',
//       color: 'white',
//       fontFamily: "'Freckle Face', cursive",
//       fontSize: '1.5rem',
//       border: '.05rem solid white',
//       borderRadius:'15px',
//       boxShadow: '10px 10px 2px 1px #0A100D',

//     }
//   }



















  // const Navigation = props => {
//     return(

//       <div>
//       <Nav tabs>
//         <NavItem>
//           <NavLink to="/Home" active>Home</NavLink>
//         </NavItem>
//         <NavItem>
//           <NavLink to="/Favorites">Favorites</NavLink>
//         </NavItem>
//         <NavItem>
//           <NavLink to="/Description">Description</NavLink>
//         </NavItem>
//       </Nav>
//     </div>


//         // <nav style={props.style}>
//         //     <NavLink to="/Home" style={styles.btn}>Home</NavLink>
//         //     <NavLink to="/Favorites" style={styles.btn}>Favorites</NavLink>
//         //     <NavLink to="/Description" style={styles.btn}>Description</NavLink>
//         // </nav>
//     )
// }