import React from 'react'
// import './MyBtn.css'

//Dummy Component
const MyBtn = props => {  
  return (
    <button style={props.style} type={props.submit}>
     {props.btnText}
    </button>
  )
}
export default MyBtn