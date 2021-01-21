import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button,Form,Modal } from 'react-bootstrap';

import {useState} from 'react'
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'


const Home=()=>{
    const [name,setName]=useState("");
    const [orgname,setOrgName]=useState("");
    const [eid,seteId]=useState("");
    const [phone,setPhone]=useState("");
    const [email,setEmail]=useState("");
    const [photo,setphoto]=useState("");
    const [show, setShow] = useState(false);
    const history=useHistory()
    
  
    const showModal=()=>{
      if(orgname===""||eid===""||phone===""||name===""||photo===""||!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
        alert("Enter all the fields correctly")
      }
      else{
        setShow(true)
      }
      
    }


    const postform=()=>{
        alert("done")

        // fetch('/hi',{
        //     method:"post",
        //     headers:{
        //         "Content-Type":"application/json"
        //     },
        //     body:JSON.stringify({
        //         name,
        //         email,
        //         eid,
        //         orgname,
        //         phone,
        //         photo
        //     })
        // }).then(res=>res.json())
        // .then(data=>{ 
            history.push({pathname:'/success',
                          state:{}})
        // })
    }
  
    return (
      <div className="App">
        
       <Form style={{width:"70%",margin:"2% auto",padding:"2% 5%",border:"1px",borderRadius:"1rem",background:"#f8f1f1"}}>
       <h3>Add Details </h3>
       <Form.Group controlId="formBasicName">
          <Form.Label >Name</Form.Label>
          <Form.Control type="text" placeholder="Enter full name" onChange={(event)=>setName(event.target.value)}/>
        </Form.Group>
  
        <Form.Group controlId="formBasicOrganisation">
          <Form.Label >Organisation Name</Form.Label>
          <Form.Control type="text" placeholder="Enter organisation name" onChange={(event)=>setOrgName(event.target.value)}/>
        </Form.Group>
        
        <Form.Group controlId="formBasicId">
          <Form.Label >Emplopyee ID No.</Form.Label>
          <Form.Control type="number" placeholder="Enter Emplopyee ID No" onChange={(event)=>seteId(event.target.value)}/>
        </Form.Group>
        
        <Form.Group controlId="formBasicEmail">
          <Form.Label >Phone No.</Form.Label>
          <Form.Control type="number" placeholder="Enter Phone No." onChange={(event)=>setPhone(event.target.value)}/>
        </Form.Group>
        
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(event)=>setEmail(event.target.value)} value={email}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
  
        <Form.Group>
          <Form.Label>Upload ID Card</Form.Label>
          <Form.File id="exampleFormControlFile1" onChange={(event)=>{setphoto(event.target.value)}}/>       
        </Form.Group>
        
        
        <Button variant="primary" onClick={() => showModal()}>
          Submit
        </Button>
  
        
      
      </Form>
  
  
      
        
        <Modal
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Check your Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <h3>Name:{name}</h3>
              <h3>Organisation Name:{orgname}</h3>
              <h3>Phone:{phone!==undefined||phone!==null?phone:`  Add Phone No.`}</h3>
              <h3>Employee ID:{eid}</h3>
              <h3>Email ID:{email}</h3>
              <Button onClick={()=>postform()}>Submit</Button>
              <Button onClick={()=>setShow(false)}>Make Changes</Button>
            </p>
          </Modal.Body>
        </Modal>
  
  
      </div>
    );
}

export default Home