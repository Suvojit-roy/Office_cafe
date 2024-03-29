import React,{useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button,Form,Modal, Spinner } from 'react-bootstrap';
import {useHistory} from 'react-router-dom'
import Navbar from '../Navbar/Navbar';
import './formStyles.css'


const FormPage=()=>{
    const [name,setName]=useState("");
    const [orgname,setOrgName]=useState("");
    const [eid,seteId]=useState("");
    const [phone,setPhone]=useState("");
    const [email,setEmail]=useState("");
    const [photo,setPhoto]=useState("");
    const [show, setShow] = useState(false);
    const [previewImg,setPreviewImg]=useState('');
    const [fileName,setFileName]=useState('');
    const [validated, setValidated] = useState(false);
    const [url,setUrl]=useState('')
    const history=useHistory();
    
    const [loading,setLoading]=useState(false);

    


  //function controlling the modal open/close
  const showModal = (event) => {

    const form = event.currentTarget;
    if(!previewImg)
          {

            setLoading(false);
            alert("Upload a user image!");
            return;
          }
    


    //manual and regex validation

    if(name=='' || orgname=='' 
    || phone=='' || eid=='' || email=='')
    {
      alert('Fill all the fields!');
      return;
    }


    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
    {
      alert('Email is incorrect!');
      return;
    }


    //react-bootstrap validation

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    }
    else
    {
      setValidated(true);
      setShow(true)
    }

    

    
  };





  useEffect(() => {

    if(url)
    {
          fetch("/add/uploadForm",
          {
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
        body:JSON.stringify({name,email,empID:eid,orgName:orgname,phone,image:url})

          }).then(res=>res.json())
          .then(res=>
          {
            // console.log(res)
            if(!res.error)
            {
              localStorage.setItem('user',res.data._id)
              history.push(`/success/${res.data._id}`)
            }
            else
            {
              //error is displayed on the screen otherwise.
                setLoading(false);
                setShow(!show);
                alert(res.error);
            }
        })
        .catch(err=>{
          alert(err);
          setLoading(false);
        })
    }
    
      
  }, [url])

  //function which handles form data posting to the backend
    const postform=async(e)=>{
      
       setLoading(true)

       //formdata created
        const formData=new FormData();
        formData.append('file',photo);
        formData.append('upload_preset','office-cafe');
        formData.append('cloud_name','ducw5cejx');

        fetch("https://api.cloudinary.com/v1_1/ducw5cejx/image/upload",
         {
                method:'post',
                body:formData
         })
            .then(res=>res.json())
            .then(res=>
            {
              setUrl(res.url)
            }).catch(err=>console.log(err))

        
        //makes a post request to save user details in the database
          
        
    }
  




   //basic form to add all details
    return (
      <div className="form-container">
      <div className="home-container">
      
      <Navbar/>

        <section className="banner" id="banner">
        <div className="form-div">
        <Form className="form" 
        noValidate validated={validated}>
          
         <h3>Upload your Details!</h3>


       <Form.Group controlId="formBasicName">

          <Form.Label className="label">Name</Form.Label>

          <Form.Control type="text" 
          placeholder="Enter full name" 
          onChange={(e)=>setName(e.target.value)} 
          required/>


          <Form.Control.Feedback type="invalid">Please enter your full name.</Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        
        </Form.Group>
          


        <Form.Group controlId="formBasicOrganisation">

        <Form.Label  className="label">Organisation Name</Form.Label>

        <Form.Control type="text" 
        placeholder="Enter organisation name" 
        onChange={(event)=>setOrgName(event.target.value)} 
        required/>

        <Form.Control.Feedback type="invalid">Please enter your organisation name.</Form.Control.Feedback>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

        </Form.Group>





          <Form.Group controlId="formBasicId">

          <Form.Label  className="label">Emplopyee ID No.</Form.Label>

          <Form.Control type="number" 
          placeholder="Enter Emplopyee ID No" 
          onChange={(event)=>seteId(event.target.value)} 
          required/>

          <Form.Control.Feedback type="invalid">Please enter your employee ID No.</Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>


          </Form.Group>




          <Form.Group controlId="formBasicPhone">

          <Form.Label  className="label">Phone No.</Form.Label>

          <Form.Control type="number" 
          placeholder="Enter Phone No." 
          onChange={(event)=>setPhone(event.target.value)} required/>

          <Form.Control.Feedback type="invalid">Please enter a valid phone number.</Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>


          </Form.Group>


          <Form.Group controlId="formBasicEmail">

          <Form.Label className="label">Email address</Form.Label>

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

          <Form.Label className="label">Upload ID Card</Form.Label>

          <Form.File id="exampleFormControlFile1" 
            onChange={(event)=>
            {
              setPhoto(event.target.files[0])
              setFileName(event.target.files[0].name)
              setPreviewImg(URL.createObjectURL(event.target.files[0]))
            }} 
            accept=".jpg,.png,.jpeg" 
          />       
          </Form.Group>

          <div className="upload-div">
          <Button for="exampleFormControlFile1" 
          onClick={()=>{
            document.querySelector('#exampleFormControlFile1')
            .click();
          }}type="button" 
          className="upload-btn"
          >Upload</Button>
          {fileName?<span>{fileName}</span>:<span>Choose an image</span>}
</div>

          <div className="form-submit">
        <Button  className="submit-btn" 
        onClick={showModal} float="right">
          Submit
        </Button>
        </div>
  
        </Form>
       
        </div>
       
        </section>
        <Modal
          className="modal"
          show={show}
          onHide={() => setShow(false)}
          size="lg"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton className="modal-header">
            <Modal.Title id="example-custom-modal-styling-title"
            className="modal-title">
             Details Preview
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <div className="modalImage">
             <img src={previewImg}/>
          </div>
          <div className="modalText">
              <h4><span>Name :</span>{name}</h4>
              <h4><span>Organisation Name :</span>{orgname}</h4>
              <h4><span>Phone :</span>{phone!==undefined||phone!==null?phone:`  Add Phone No.`}</h4>
              <h4><span>Employee ID :</span>{eid}</h4>
              <h4><span>Email ID :</span>{email}</h4>
          </div>



            {loading?<Spinner animation="border" role="status" className="spinner"/>:''}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={postform} 
            className="modal-submit">Submit</Button>
            <Button onClick={()=>setShow(false)} 
            variant="secondary"
            className="modal-changes">Make Changes</Button>
          </Modal.Footer>
        </Modal>
  
  
      </div>
    </div>
    );
}


export default FormPage