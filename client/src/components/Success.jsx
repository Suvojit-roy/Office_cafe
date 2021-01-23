import React,{useEffect, useState} from "react";
import { Button, Jumbotron,Spinner } from "react-bootstrap";
import { Link, useLocation, useParams } from "react-router-dom";


const Success=(props)=>{

const {id}=useParams();

const location=useLocation();
const [loading,setLoading]=useState(true);

const [userData,setUserData]=useState('');

//fetch data passed from home using state in history.push 
useEffect(() => {
    console.log(id)
    fetch(`http://localhost:5000/add/fetchDetails/${id}`,
          {
            method:'GET',

          }).then(res=>res.json())
          .then(res=>
            {
                console.log(res);
                setUserData(res.data);
                setLoading(false);
            })
          .catch(err=>{
            setLoading(false);
            alert(err.error);
          })
}, [])

return(
    <>
    {userData?<Jumbotron 
    style={{width:"60%",
    border:"2px solid green",
    margin:'10px auto',
    left:'10%',
    borderRadius:'10px',
    }}>
    <h1>You have registered successfully</h1>
    <br/>
    <p>
        Your registration details are:
        <p className="modalText">
           <h4><span>Registration ID:</span>{userData._id}</h4>
            <h4><span>Name:</span>{userData.name}</h4>
            <h4><span>Organisation Name:</span>{userData.orgName}</h4>
            <h4><span>Employee ID:</span>{userData.empID}</h4>
        </p>
        <Link to="/cafepage">
        <Button variant="primary">Browse Cafe Menu</Button>
        </Link>
        
    </p>
    </Jumbotron>:<Spinner animation="border" role="status" className="spinner"/>}
    </>
)

}

export default Success