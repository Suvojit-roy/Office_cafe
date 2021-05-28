import React, { useEffect } from 'react'
import './homeStyles.css'
import pizza2 from '../../images/pizza2.jpg'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import food from '../../images/food.png'
import Navbar from '../Navbar/Navbar'

const Home = () => {


    // const {count}=cart;


    const [loading,setLoading]=useState(true);
    const [menu,setMenu]=useState('')

    useEffect(()=>
    {
            setLoading(true)
            fetch("/cafe/foodList",
            {
                method:'get'
            }).then(res=>res.json())
            .then(res=>{
                setMenu(res.data.results.slice(1,7))
                setLoading(false);
            })
            .catch(err=>alert(err))
    },[])


    const MenuContent = () =>
    {
         return (
            <div className="menu-content">
           {menu!='' && menu.map(item=>
            
            {
            return (
                <div className="box">
                <div className="imgBx">
                    <img src={item.ItemImage.url} height="100px"></img>
                </div>
                <div className="text">
                    <h3>{item.ItemName}</h3>
                </div>
            </div>
                )
            })
            }
             
            </div>
         
         )
    }
    


    return (
  <>
            {loading?
            <div className="spinner">
                <div class="spinner-grow text-info" 
            role="status">
            <span class="sr-only">Loading...</span>
            <b/><br/>
            <h4>Loading...</h4>
          </div>
            </div>
            
            :
            <div className="home-container">
            <Navbar></Navbar>
            <section class="banner" id="banner">
             <div class="content">
                 <h1>Office Eats</h1>
                 <p>Welcome to your one stop destination for food ordering!
                     Order your meals while you sit on your office chairs burdened with the hectic work.We shall serve your meals without any delay.
                     Here you will find a vast variety of healthy menu items to satisfy your hunger and reduce your work pressure.
                 </p>
                 <button 
                 type="button" className="btn">
                     <a href="#about">Know More</a></button>
             </div>
            </section>     
            
            <section class="about" id="about">
                <div className="row">
                    <div className="col-lg-7">
                       <img className="about-img" src={pizza2}/>
                    </div>
                    <div className="col-lg-5">
                    <h2 class="about-title"><span>A</span>bout Us</h2>
                        <p>We,at Office Eats are trying to build a platform to help serve the office or building canteens and cater to the employee needs.
                            Order with us and get your meals delivered super-fast!
                            Fill in your details by hitting the Order Now button and go ahead and place your order.
                            Pay your bills using Card Details and give yourself a yummy treat!
                        </p>
                    </div>
                </div>
            </section>
 
            <section className="menu" id="menu">
                <div className="title">
                <h2 class="menu-title"><span>M</span>enu</h2>
                </div>
                <MenuContent/>
                   <Link to="/addDetails">
                    <button type="button" 
                    className="btn">
                        View All</button></Link>
                
            </section>
 
 
            <section class="contact" id="contact">
                <div className="contact-title">
                    <h2><span>C</span>ontact Us</h2>
                </div>
                <div className="content">
                   
                   <form class="contact-form">
                         <div class="form-group">
                         <div class="input-group flex-nowrap">
                                 <div class="input-group-prepend">
                                     <span class="input-group-text" 
                                     id="addon-wrapping"><i class="fa fa-user"/></span>
                                 </div>
                                 <input type="text" class="form-control"
                                  placeholder="Enter your username"
                                   aria-label="Username" aria-describedby="addon-wrapping"/>
                                 </div>
                         </div>
 
                         <div class="form-group">
                         <div class="input-group flex-nowrap">
                                 <div class="input-group-prepend">
                                     <span class="input-group-text" id="addon-wrapping">
                                         <i class="fa fa-envelope"/>
                                     </span>
                                 </div>
                                 <input type="email" class="form-control"
                                  placeholder="Enter your mail address" aria-describedby="addon-wrapping"/>
                                 </div>
                         </div>
                         
                         <button type="submit" class="btn">Submit</button>
                         </form>
 
                    <div className="contact-img">
                        <img className="imgc" src={food} height="220" width="280"></img>
                    </div>
 
 
                        <div className="social-icons">
                            <ul>
                                <li><a href="/"><i class="fa fa-instagram"/></a></li>
                                <li><a href="/"><i class="fa fa-facebook"/></a></li>
                                <li><a href="/"><i class="fa fa-twitter"/></a></li>
                                <li><a href="/"><i class="fa fa-github"/></a></li>
                            </ul>
                        </div>
                    
 
 
                </div>
                
            </section>
         </div>}
           </>
    )
}

export default Home
