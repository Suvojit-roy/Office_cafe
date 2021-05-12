import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import CafeNav from './../CafeNav'
import './homeStyles.css'
import pizza2 from '../images/pizza2.jpg'
import { Link } from 'react-router-dom'



const Home = () => {


    // const {count}=cart;
    

    return (
        <div className="home-container">
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
               <p>in laying out print, graphic or web designs.</p>
               </div>
               <div className="menu-content">
                   <div className="box">
                       <div className="imgBx">
                           <img src={pizza2} height="100px"></img>
                       </div>
                       <div className="text">
                           <h3>Salads</h3>
                       </div>
                   </div>
                   <div className="box">
                       <div className="imgBx">
                           <img src={pizza2} height="100px"></img>
                       </div>
                       <div className="text">
                           <h3>Salads</h3>
                       </div>
                   </div>
                   <div className="box">
                       <div className="imgBx">
                           <img src={pizza2} height="100px"></img>
                       </div>
                       <div className="text">
                           <h3>Salads</h3>
                       </div>
                   </div>
                   <div className="box">
                       <div className="imgBx">
                           <img src={pizza2} height="100px"></img>
                       </div>
                       <div className="text">
                           <h3>Salads</h3>
                       </div>
                   </div>
                   <div className="box">
                       <div className="imgBx">
                           <img src={pizza2} height="100px"></img>
                       </div>
                       <div className="text">
                           <h3>Salads</h3>
                       </div>
                   </div>
                   <div className="box">
                       <div className="imgBx">
                           <img src={pizza2} height="100px"></img>
                       </div>
                       <div className="text">
                           <h3>Salads</h3>
                       </div>
                   </div>
                   </div>
                   <Link to="/cafepage/browse">
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
        </div>
    )
}

export default Home
