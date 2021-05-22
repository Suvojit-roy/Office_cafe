import React,{useEffect, useState} from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../Home/homeStyles.css'
import blackcrockery from '../../images/blackcrockery.png'
import knifeorange from '../../images/knifEorange.jpeg'
import {Badge} from  '@material-ui/core'
import {connect} from 'react-redux'

import './navbarStyles.css'


const Navbar = ({userId,amount}) => {

const location = useLocation()
const [loc,setLoc]=useState(location.pathname)
const [data,setData]=useState('')

useEffect(() => {

    fetch(`/add/fetchDetails/${userId}`,
        {
          method:'GET',

        }).then(res=>res.json())
        .then(res=>
          {
              setData(res.data);
          })
        .catch(err=>{
          console.log(err);
        })



   window.onload= function ()
   {
    window.addEventListener("scroll", ()=>
    {
        var header,image,icon,nameSel
        header = document.getElementById('head');
        image=document.querySelector('.img-logo');

        //for cart page only
        

        //when you scroll window
        header.classList.toggle('sticky',window.scrollY>0);
            if(header.classList.contains('sticky'))
            {
                       image.src=knifeorange;
                       image.id=''
            }
            else
            {
                       image.src=blackcrockery;
                       image.id='invertLogo'
            }
        
    })

   }
    
       

}, [])




const toggleMenu = () =>
{
    const menu=document.querySelector('.toggle');
    const nav=document.querySelector('.navigation');
    menu.classList.toggle('active')
    nav.classList.toggle('active')
    
}


    return (
   <header className="header" id="head">
    <a href="/" className="logo">OfficeEats
    <span>
        <img src={blackcrockery} className="img-logo" 
        id="invertLogo"></img></span></a>
   
   
   {/* toggler  */}

   <div className="toggle"
   onClick={toggleMenu}> </div>
   
   
    <ul class="navigation">
           
           {loc===`/menu/${userId}` || loc===`/cart/${userId}`
           || loc===`/orderPlaced/${userId}`?
           <><li id="user">Signed in as {data.name}</li>
           <li><Link to={`/cart/${userId}`}>
               <Badge badgeContent={amount} 
               color="error">
                    <i class="fa fa-shopping-cart nav-i"></i>
                </Badge></Link></li></>:
                <>
                <li><a href="/">Home</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#menu">Menu</a></li>
                <li><a href="/addDetails">Order Now</a></li>
                </>
     }

<li><a href="/login" id="last-li">Login</a></li>
    </ul>
</header>
    )
}





const mapStatetoProps=(state)=>
{
   return  {
       amount:state.total
}
}

export default connect(mapStatetoProps)(Navbar)


