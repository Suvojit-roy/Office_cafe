import React,{useEffect, useState} from "react";
import { Button,Spinner } from "react-bootstrap";
import { Link,useParams } from "react-router-dom";
import './successStyles.css'
import success from './../../images/success.jpg'
import {connect} from 'react-redux'




const Success=()=>{

const {id}=useParams();



//displays user data in jumbotron
return(
  <div className="success-container">
    {id?
    <div
    className="success-div">
    <div className="success-vector">
      <img src={success}></img>
    </div>
    <br/>
    <div className="success-text">
    <div className="reg-title">
      <h3>Great!</h3>
      <p className="reg-details">
      <p>You have successfully completed your registration.
       <br></br>Your Registration ID:<span style={{
        fontSize:'1.4em',
        color:'white',
        fontWeight:'bolder'
      }}>
        {id.substr(0,8)}
      </span>
      <span>(Kindly do not share this with anyone!)</span></p>
      </p>
      
    </div>
    <p className="link">
        <Link to={`/menu/${id}`}>
        <Button className="browse-button">Browse Cafe Menu</Button>
        </Link>
        
    </p>
    </div>
    </div>:<Spinner animation="border" 
    role="status" className="spinner"/>}
    
    </div>
    

)

}



export default (Success)