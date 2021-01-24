import React,{useState,useEffect} from 'react'
import {Navbar} from 'react-bootstrap'

const CafeNav=({id})=>{


const [userImg,setUserImg]=useState('');
const [userName,setUserName]=useState('');

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
                setUserName(res.data.name);
                // setUserImg(res.data.image.replace("public", ""))
                //image route is modified to get the image stored on the server side
            })
          .catch(err=>{
            console.log(err)
            alert(err.error);
            //error alerted
          })
}, [])




//Simple Navbar Component showing the user details.
return(
    <>
        
    <Navbar bg="dark" variant="dark">
    <Navbar.Brand>Our Cafe </Navbar.Brand>
    <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
        Signed in as:{userName}
        </Navbar.Text>
        {/* <img style={{borderRadius:"50%"}}
        alt=""
        src={userImg}
        width="30"
        height="30"
        className="d-inline-block align-top"
      />{' '} */}
    </Navbar.Collapse>
  </Navbar>
        
    </>
)
}

export default CafeNav