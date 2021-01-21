import React from 'react'
import {Navbar} from 'react-bootstrap'

const CafeNav=(props)=>{
return(
    <>
        
    <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">
      <img
        style={{borderRadius:"50%"}}
        alt=""
        src="https://images.pexels.com/photos/6273549/pexels-photo-6273549.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        width="30"
        height="30"
        className="d-inline-block align-top"
      />{' '}
      Our Cafe
    </Navbar.Brand>
    <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
        Signed in as: <a href="#login">show id</a>
        </Navbar.Text>
        <img style={{borderRadius:"50%"}}
        alt=""
        src="https://images.pexels.com/photos/6273549/pexels-photo-6273549.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500   "
        width="30"
        height="30"
        className="d-inline-block align-top"
      />{' '}
    </Navbar.Collapse>
  </Navbar>
        
    </>
)
}

export default CafeNav