import React,{useEffect, useState} from "react";
import { Button, Jumbotron,Spinner } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";


const Success=(props)=>{


const location=useLocation();
const [loading,setLoading]=useState(true);

const [userData,setUserData]=useState('');

//fetch data passed from home using state in history.push 
useEffect(() => {
   setUserData(location.user);
   setLoading(false);
}, [location])

return(
    <>
    {userData?<Jumbotron>
    <h1>You have registered successfully</h1>
    <p>
        Your registration details are:
        <p className="modalText">
           <h4><span>Registration ID:</span>{userData._id}</h4>
            <h4><span>Name:</span>{userData.name}</h4>
            <h4><span>Organisation Name:</span>{userData.orgName}</h4>
            <h4><span>Employee ID:</span>{userData.empID}</h4>
        </p>
        <Button variant="primary" component={Link} to="/cafe">Browse Cafe Menu</Button>
    </p>
    <p>
        <Button variant="primary">Learn more</Button>
    </p>
    </Jumbotron>:<Spinner animation="border" role="status" className="spinner"/>}
    </>
)

}

export default Success