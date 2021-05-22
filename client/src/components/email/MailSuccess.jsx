import React,{useState} from 'react'
import { useHistory, useLocation, useParams } from 'react-router'
import Navbar from '../Navbar/Navbar';
import './mailStyles.css'
const MailSuccess = () => {


    const {id}=useParams();
    const history=useHistory();
    
    
    return (
        <div className="home-container mail-container">
        <Navbar userId={id}/>
        <section className="banner" id="banner">
            <div className="cart-content">
                <h2 style={{marginBottom:'30px'}}>Congratulations🎉!</h2>
           <h3>
               Your order has been successfully placed!<br/>
               Please check your mail Inbox for further details.
           </h3>
           <div className="cart-btn">
           <button onClick={()=>history.push(`/menu/${id}`)}>
            Go Back to Menu Page</button>
            </div>
            </div>
        </section>
       </div>
       
    )
}

export default MailSuccess
