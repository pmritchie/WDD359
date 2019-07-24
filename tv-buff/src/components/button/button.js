import React from 'react';
import './MyBtn.css';

// Dummy Component
const MyBtn = props => (
  <button style={props.style} type={props.submit}>
    <i className="material-icons md-36">search</i>
  </button>
);
export default MyBtn;
