import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import '../Home/homeStyles.css'

import blackcrockery from '../images/blackcrockery.png'
import knifEorange from '../images/knifEorange.jpeg'
import {Badge} from  '@material-ui/core'
import {connect} from 'react-redux'

import './navbarStyles.css'


const Navbar = ({userId,amount}) => {


const [id,setId] = useState(userId ? userId:null); 

useEffect(() => {

    console.log(window.location.href)
    console.log(amount)
    window.addEventListener('scroll',function()
    {
        const header=document.querySelector('header');
        const image=document.querySelector('.img-logo');
        header.classList.toggle('sticky',window.scrollY>0);
        if(header.classList.contains('sticky'))
        {
            image.src=knifEorange;
            image.id=''
        }
        else
        {
            image.src=blackcrockery;
            image.id='invertLogo'
        }
        
    })

    toggleMenu();


}, [])




const toggleMenu = () =>
{
    const menu=document.querySelector('.toggle');
    const nav=document.querySelector('.navigation');
    menu.classList.toggle('active')
    nav.classList.toggle('active')
}


    return (
<header className="header">
    <a href="/" className="logo">OfficeEats
    <span>
        <img src={blackcrockery} className="img-logo" 
        id="invertLogo"></img></span></a>
   
   
   {/* toggler  */}

   <div className="toggle"
   onClick={toggleMenu}> </div>
   
   
    <ul class="navigation">
           <li ><a href="/">Home</a></li>
           <li><a href="#about">About Us</a></li>
           <li><a href="/cafepage/browse">Menu</a></li>
           <li><a href="/addDetails">Order Now</a></li>
           <li><a href="/login" id="last-li">Login</a></li>
           {id?
           <li><Link to={`/cart/${id}`}>
               <Badge badgeContent={amount} 
               color="error">
                    <i class="fa fa-shopping-cart"></i>
                </Badge></Link></li>:''}
       <hr/>
    </ul>
</header>
    )
}





const mapStatetoProps=(state)=>
{
   return {amount:state.total}
}

export default connect(mapStatetoProps)(Navbar)


