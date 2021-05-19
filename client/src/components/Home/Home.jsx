import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import './homeStyles.css'
import pizza2 from '../../images/pizza2.jpg'
import { Link } from 'react-router-dom'
import { useState } from 'react'



const Home = () => {


    // const {count}=cart;


    const [loading,setLoading]=useState(true);
    const [menu,setMenu]=useState('')

    useEffect(()=>
    {
            setLoading(true)
            fetch("http://localhost:8000/cafe/foodList",
            {
                method:'get'
            }).then(res=>res.json())
            .then(res=>{
                console.log(res)
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
        <div className="home-container">
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
            <div>
             <Navbar/>
            
            <section class="banner" id="banner">
             <div class="content">
                 <h1>Welcome</h1>
                 <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used 
                     in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter 
                     in the 15th century who is thought to have scrambled parts of Cicero's De 
                     Finibus Bonorum et Malorum for use in a type specimen book.</p>
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
                        <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used 
                     in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter 
                     in the 15th century who is thought to have scrambled parts of Cicero's De 
                     Finibus Bonorum et Malorum for use in a type specimen book.
                     Lorem ipsum, or lipsum as it is sometimes known, is dummy text used 
                     in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter 
                     in the 15th century who is thought to have scrambled parts of Cicero's De 
                     Finibus Bonorum et Malorum for use in a type specimen book.</p>
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
           </div>
    )
}

export default Home
