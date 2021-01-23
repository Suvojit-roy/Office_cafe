import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button,Form,Modal, Spinner } from 'react-bootstrap';

import {useState} from 'react'
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'


const Home=()=>{
    const [name,setName]=useState("");
    const [orgname,setOrgName]=useState("");
    const [eid,seteId]=useState("");
    const [phone,setPhone]=useState("");
    const [email,setEmail]=useState("");
    const [photo,setPhoto]=useState("");
    const [show, setShow] = useState(false);
    const [previewImg,setPreviewImg]=useState('');
    const [validated, setValidated] = useState(false);
    const history=useHistory();
    

    const [loading,setLoading]=useState(false);

    


    const uploadImage = (e) =>
    {
          setLoading(true)
          e.preventDefault();

          if(!photo)
          {

            setLoading(false);
            alert("Upload a user image!");
            return;
          }
          
          setPreviewImg(URL.createObjectURL(photo));
          setLoading(false);
          alert("Image Uploaded");


    }


  const showModal = (event) => {


    const form = event.currentTarget;
    if(!photo)
          {

            setLoading(false);
            alert("Upload a user image!");
            return;
          }
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setShow(true)
      setValidated(true);
  };


    const postform=(e)=>{
      
       setLoading(true)
        const formData=new FormData();
        formData.append('userImage',photo);
        formData.append('name',name);
        formData.append('orgName',orgname);
        formData.append('email',email);
        formData.append('empID',eid);
        formData.append('phone',phone);

          fetch("/add/uploadForm",
          {
            method:'POST',
            body:formData

          }).then(res=>res.json())
          .then(res=>
            {
                console.log(res);
                // setPhoto(res.imagePath);
                
                if(!res.error)
                {
                  history.push(`/success/${res.data._id}`)
            }
            else
            {
               setLoading(false);
               setShow(!show);
               console.log(res.error)
               alert(res.error);
            }
            })
          .catch(err=>{
            console.log(err)
            alert(err.error);
            setLoading(false);
          })
        
    }
  
    return (
      <div className="App">
      
       <Form 
       style={{width:"70%",margin:"2% auto",padding:"2% 5%",border:"1px",borderRadius:"1rem",background:"#f8f1f1"}}
       noValidate validated={validated}>


       <h3>Add Details </h3>


       <Form.Group controlId="formBasicName">

          <Form.Label >Name</Form.Label>

          <Form.Control type="text" 
          placeholder="Enter full name" 
          onChange={(e)=>setName(e.target.value)} 
          required/>


          <Form.Control.Feedback type="invalid">Please enter your full name.</Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        
        </Form.Group>
          


        <Form.Group controlId="formBasicOrganisation">

        <Form.Label >Organisation Name</Form.Label>

        <Form.Control type="text" 
        placeholder="Enter organisation name" 
        onChange={(event)=>setOrgName(event.target.value)} 
        required/>

        <Form.Control.Feedback type="invalid">Please enter your organisation name.</Form.Control.Feedback>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

        </Form.Group>





          <Form.Group controlId="formBasicId">

          <Form.Label >Emplopyee ID No.</Form.Label>

          <Form.Control type="number" 
          placeholder="Enter Emplopyee ID No" 
          onChange={(event)=>seteId(event.target.value)} 
          required/>

          <Form.Control.Feedback type="invalid">Please enter your employee ID No.</Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>


          </Form.Group>




          <Form.Group controlId="formBasicPhone">

          <Form.Label >Phone No.</Form.Label>

          <Form.Control type="number" 
          placeholder="Enter Phone No." 
          onChange={(event)=>setPhone(event.target.value)} required/>

          <Form.Control.Feedback type="invalid">Please enter a valid phone number.</Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>


          </Form.Group>


          <Form.Group controlId="formBasicEmail">

          <Form.Label>Email address</Form.Label>

          <Form.Control type="email" 
          placeholder="Enter email" 
          onChange={(event)=>setEmail(event.target.value)} 
          required/>

          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>


          <Form.Control.Feedback type="invalid">Please enter your correct email ID.</Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>


          </Form.Group>

          <Form.Group>

          <Form.Label>Upload ID Card</Form.Label>

          <Form.File id="exampleFormControlFile1" 
          onChange={(event)=>{setPhoto(event.target.files[0])}} 
          accept=".jpg,.png,.jpeg" 
          />       
          </Form.Group>

          <Button type="button" 
          variant="primary" 
          onClick={uploadImage}>Upload Image</Button>

          <br/>
          <br/>
        
        <Button variant="primary" onClick={showModal} float="right">
          Submit
        </Button>
  
        </Form>
     
  
  
        {loading?<Spinner animation="border" role="status" className="spinner"/>:''}
       
        
        <Modal
          className="modal"
          show={show}
          onHide={() => setShow(false)}
          size="lg"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
             Details Preview
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <p className="modalText">
            <img src={previewImg}/>
              <h4><span>Name:</span>{name}</h4>
              <h4><span>Organisation Name:</span>{orgname}</h4>
              <h4><span>Phone:</span>{phone!==undefined||phone!==null?phone:`  Add Phone No.`}</h4>
              <h4><span>Employee ID:</span>{eid}</h4>
              <h4><span>Email ID:</span>{email}</h4>
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={postform} variant="primary">Submit</Button>
            <Button onClick={()=>setShow(false)} variant="secondary">Make Changes</Button>
          </Modal.Footer>
        </Modal>
  
  
      </div>
    );
}

export default Home