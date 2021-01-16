import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button,Form } from 'react-bootstrap';
import react from 'react'
import {useState} from 'react'

function App() {
  const [name,setName]=useState();


  return (
    <div className="App">
      
     <Form style={{width:"70%",margin:"2% auto",padding:"2% 5%",border:"1px",borderRadius:"1rem",background:"#f8f1f1"}}>
     <h3>Add Details </h3>
     <Form.Group controlId="formBasicName">
        <Form.Label >Name</Form.Label>
        <Form.Control type="text" placeholder="Enter full name" />
      </Form.Group>

      <Form.Group controlId="formBasicOrganisation">
        <Form.Label >Organisation Name</Form.Label>
        <Form.Control type="text" placeholder="Enter organisation name" />
      </Form.Group>
      
      <Form.Group controlId="formBasicId">
        <Form.Label >Emplopyee ID No.</Form.Label>
        <Form.Control type="number" placeholder="Enter Emplopyee ID No" />
      </Form.Group>
      
      <Form.Group controlId="formBasicEmail">
        <Form.Label >Phone No.</Form.Label>
        <Form.Control type="number" placeholder="Enter Phone No." />
      </Form.Group>
      
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group>
        <Form.Label>Upload ID Card</Form.Label>
        <Form.File id="exampleFormControlFile1" />       
      </Form.Group>
      
      <Button variant="primary" type="submit" style={{background:"#16c79a",border:"none"}}>
        Submit
      </Button>
    </Form>
    </div>
  );
}

export default App;
