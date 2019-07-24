// import React from 'react';
// import PropTypes from 'prop-types';
// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
// import { NavLink as RRNavLink} from 'react-router-dom'
// import './Nav.css'

// function TabContainer(props) {
//   return (
//     <Typography component="div" style={{ padding: 8 * 3 }}>
//       {props.children}
//     </Typography>
//   );
// }

// TabContainer.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// function LinkTab(props) {
//   return (
//     <Tab
//       component="a"
//       onClick={event => {
//         event.preventDefault();
//       }}
//       {...props}
//     />
//   );
// }


// function NavTabs() {

//   const [value, setValue] = React.useState(0);

//   function handleChange(event, newValue) {
//     setValue(newValue);
//   }

//   return (
//     <div >
//       <AppBar style={styles.nav} position="static">
//         <Tabs variant="fullWidth" value={value} onChange={handleChange}>
//           <LinkTab label="Home" tag={RRNavLink} href="/Home" />
//           <LinkTab label="Favorites" href="/Favorites" />
//         </Tabs>
//       </AppBar>

//     </div>
//   );
// }

// export default NavTabs;


// const styles = {
//    nav: {
//      backgroundColor: "yellow",
//    }
// }


import React, { Component } from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';
import './Nav.css';


export default class Navigation extends Component {
 state={
   active: false,
 }

 render() {
   return (
     <div>
       <Nav className="navi" tabs>
         <NavItem className="item">
           <NavLink activeClassName="active" className="link" tag={RRNavLink} to="/Home">Home</NavLink>
         </NavItem>
         <NavItem className="item">
           <NavLink activeClassName="active" className="link" tag={RRNavLink} to="/Favorites">Favorites</NavLink>
         </NavItem>
         <NavItem className="item">
           <NavLink activeClassName="active" className="link" tag={RRNavLink} to="/Description">Description</NavLink>
         </NavItem>
       </Nav>
     </div>

   );
 }
}


//   // const Navigation = props => {
// //     return(

// //       <div>
// //       <Nav tabs>
// //         <NavItem>
// //           <NavLink to="/Home" active>Home</NavLink>
// //         </NavItem>
// //         <NavItem>
// //           <NavLink to="/Favorites">Favorites</NavLink>
// //         </NavItem>
// //         <NavItem>
// //           <NavLink to="/Description">Description</NavLink>
// //         </NavItem>
// //       </Nav>
// //     </div>


// //         // <nav style={props.style}>
// //         //     <NavLink to="/Home" style={styles.btn}>Home</NavLink>
// //         //     <NavLink to="/Favorites" style={styles.btn}>Favorites</NavLink>
// //         //     <NavLink to="/Description" style={styles.btn}>Description</NavLink>
// //         // </nav>
// //     )
// // }
