import React,{useEffect, useState} from "react";
import LoadingOverlay from 'react-loading-overlay';
import { Card, Col, Container,Row,Button} from "react-bootstrap";
import {MdDelete} from 'react-icons/md';
import CafeNav from "./CafeNav";
import { useParams,useLocation } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import './cafeStyles.css'
import CafePageItem from "./CafePageItem";
import {connect} from 'react-redux'



const Cafepage = ({addItemToCart}) => {

//get extra data passed from success page
const location = useLocation()

const {id}=useParams();

//  console.log(id)

const [cart,setCart]=useState([]);
const [loading,setLoading]=useState(true)
const [foodItems,setFoodItems]=useState(location.state?location.state.items.items:[]);
const [total,setTotal]=useState(0);
const [paymentMode,setPaymentMode]=useState('cash');


//card states
const [cardname,setCardName]=useState('ABC');
const [expiry,setExpiry]=useState('12/24');
const [cvv,setCvv]=useState('033');
const [cardnumber,setCardNumber]=useState('');




  //calls the route on the backend which saves the food array to the database and returns the items.
 
//add to cart functionality is implemented
// const addToCart = (itemName,price,quantity) =>
// {

//    //if cart is not empty then we check if the added item is already present in the cafe or not.
   
//    if(cart.length!=0)
//    {
//       var item=cart.find(({ name }) => name === itemName)

//       //If present,we simply increase the quantity and add up the price
//       if(item) 
//       {
//         item.quantity+=1;
//         item.price+=price;
//         setTotal(total+price)
//         setCart(cart)
        
//       }
//       //else we create a new item and push it to the existing array
//       else 
//       {
//         setCart([...cart,{name:itemName,price,quantity}])
//         setTotal(total+price);
//       }
//    }

//    //else we create a new item and push into the empty array
//    else
//    {
//     setCart([...cart,{name:itemName,price,quantity}])
//     setTotal(total+price);
//    }


//    localStorage.setItem('cart',JSON.stringify(cart))
   
// }
 


const addToCart = (id) =>
{
  addItemToCart(id)
}

//loading spinner
const Spin = ({message}) =>
{
   return (
      <LoadingOverlay
      active={loading}
      spinner
      text={message}
      >
    </LoadingOverlay>
   )
}


//implemented the delete functionality using this function
// const deleteFromCart = (itemName) =>
// {
//     var item=cart.find(({name})=>name===itemName)
//     var newcart=cart.filter(item=>item.name!=itemName);
//     console.log(newcart)
//     setTotal(total-item.price);
//     setCart(newcart);
// }




//completely clears the cart if there are existing items
// const clearCart = () =>
// {
//    setCart([]);
//    setTotal(0);
// }



//This function starts a timer for an interval(takeaway time for the order)
// const pay = () =>
// {
//    setLoading(true);
//    alert(`Payment Processing with ${paymentMode}!`);
//    setTimeout(() => {
//      setLoading(false)
//      clearCart();

//      alert("Payment Completed...Enjoy your meal!");
//    }, 3000);
// }



  
//displays cart Items by map over items in the cart
const CartDiv = ({item}) =>
{
   return (
    <div  style={{display:'flex',justifyContent:'space-between'}}>
    <h5>
    {/* <MdDelete onClick={()=>deleteFromCart(item.name)}/> */}
    {item.name}(<span style={{color:'gray',fontSize:'15px'}}>qty:</span>{item.quantity})
    </h5>
    <h5>Rs.{item.price}</h5>
    </div>

   )
}




//renders food items grid and cart box in a flex display
  return (
    <div className="cafe-container">
      <div className="home-container">
        <Navbar userId={id}/>
      {/* <CafeNav id={id}/> */}
      <section className="banner" id="banner">
        <div className="cafe-content">
      {foodItems.length==0 && loading?<Spin message="Loading Cafe Menu"/>:''}
      {/* {foodItems && loading?<Spin message="Processing your payment"/>:''} */}
        <Container style={{margin:'10px auto'}}>
          <Row>
            {/* <Col xs={8}> */}
            {/* <Row> */}
              {foodItems.length!=0 && foodItems.map((item)=>
                {
                  return(
                     <CafePageItem item={item}
                     id={id}
                     addToCart={addToCart}
                    />
                  )
                })}
            
             
          </Row>
        </Container>
        </div>
        </section>
        </div>
    </div>
  );
};





const mapStatetoProps=(state)=>
{

  
  return {
    items: state.cart
     }

}



const mapDispatchToProps= (dispatch)=>{
    
  return{
      addItemToCart: (id)=>{
         dispatch({ 
        type: "ADD_TO_CART", 
        payload:id
      });
    }

  }
}

export default  connect(mapStatetoProps,mapDispatchToProps)(Cafepage)