import React,{useEffect, useState} from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../Home/homeStyles.css'
import blackcrockery from '../../images/blackcrockery.png'
import knifeorange from '../../images/knifEorange.jpeg'
import {Badge} from  '@material-ui/core'
import {connect} from 'react-redux'

import './navbarStyles.css'


const Navbar = ({userId,amount,userName}) => {

const [id,setId] = useState(userId ? userId:null); 
const location = useLocation()
const [loc,setLoc]=useState(location.pathname)
const [name,setName]=useState(userName?userName:'')

console.log(location.pathname)

useEffect(() => {

   window.onload= function ()
   {
    window.addEventListener("scroll", ()=>
    {
        var header,image,icon,nameSel
        header = document.getElementById('head');
        image=document.querySelector('.img-logo');

        //for cart page only
        if(loc==`/menu/${id}`) 
        {
            icon=document.querySelector('.nav-i')
            nameSel=document.querySelector('#user')
        }

        //when you scroll window
        header.classList.toggle('sticky',window.scrollY>0);
            if(header.classList.contains('sticky'))
            {
                       image.src=knifeorange;
                       image.id=''
                       if(nameSel && icon)
                        { 
                          icon.style.color="tomato"
                          nameSel.style.color="tomato"
                        }
                       
            }
            else
            {
                       image.src=blackcrockery;
                       image.id='invertLogo'
                       if(nameSel && icon)
                       {
                           icon.style.color="white"
                           nameSel.style.color="white"
                       }
            }
        
    })


    toggleMenu();
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
           
           {id && name?
           <><li id="user">Signed in as {name}</li>
           <li><Link to={`/cart/${id}`}>
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


