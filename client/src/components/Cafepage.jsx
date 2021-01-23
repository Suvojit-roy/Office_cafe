import React,{useEffect, useState} from "react";
import LoadingOverlay from 'react-loading-overlay';
import { Card, CardDeck, Col, Container,Row,Button, Spinner} from "react-bootstrap";
import {MdDelete} from 'react-icons/md';

import CafeNav from "./CafeNav";
import { useParams } from "react-router-dom";

const Cafepage = () => {


const {id}=useParams();

  
const [cart,setCart]=useState([]);
const [loading,setLoading]=useState(true)


  const [foodItems,setFoodItems]=useState('');
  const [total,setTotal]=useState(0);

  useEffect(() => {
    fetch("/cafe/foodList",
    {
      method:'POST'
    })
    .then(res=>res.json())
    .then(res=>{
      setFoodItems(res.items);
      setLoading(false);
    })
    .catch(err=>alert(err))


    console.log(localStorage.getItem('cart'));



  }, [])




const addToCart = (name,price,quantity) =>
{
   console.log(name,price)
  //  cart.push({name,price})
   const cartItems=cart;
   var item=cartItems.find(name)
   if(item) 
   {
     item.quantity=item.quantity+1;
     item.price=item.price+price;
   }
   else 
   {
     setCart([...cart,{name,price,quantity}])
     setTotal(total+price);
   }

   localStorage.setItem('cart',cart)
   
}
       
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

const Empty = () =>
{
    return (
      <div>
<h2>Your Cart is Empty</h2>
      </div>
    )
}


const deleteFromCart = (name) =>
{
    cart.filter(item=>item.name!=name);
    setCart(cart);
}


const clearCart = () =>
{
   setCart([]);
   setTotal(0);
}

const pay = () =>
{
   setLoading(true);
   alert('Payment Processing!');
   setTimeout(() => {
     setLoading(false)
     clearCart();

     alert("Payment Completed");
   }, 3000);
}
  //  console.log(JSON.parse(localStorage.getItem('cart')))


const check = () =>
{
    return cart.length==0;
}


       
  return (
    <>
      <CafeNav id={id}/>

      {!foodItems && loading?<Spin message="Loading Cafe Menu"/>:''}
      {foodItems && loading?<Spin message="Processing your payment"/>:''}
        <Container style={{margin:'10px auto'}}>
          <Row>
            <Col xs={9}>
            <Row>
              {foodItems!='' && foodItems.map((item)=>
                {
                  return(
              <Col xs={5}>
              <Card style={{marginBottom:'20px'}}>
             <Card.Img
             className="cardImage"
               variant="top"
               src={item.image}
             />
             <Card.Body>
               <Card.Title>{item.name}</Card.Title>
               <Card.Text>
                 <h4 style={{display:'flex',justifyContent:'space-between'}}>Price<span>Rs.{item.price}</span></h4>
               </Card.Text>
             </Card.Body>
             <Card.Footer>
               <Button style={{float:'right'}}
                onClick={()=>addToCart(item.name,item.price,1)}
               >Add to Cart</Button>
             </Card.Footer>
           </Card>
          </Col>
                  )
                })}
            
              </Row>
              </Col>
              <Col xs={3}>
                <Card>
                  <Card.Title><h3 style={{textAlign:'center'}}>Cart</h3></Card.Title>
                  <Card.Body>
                  <Card.Text>
                {cart.length!=0 ? 
                cart.map((item)=>
                {
                   return (
                      <div style={{display:'flex'}}>
                        <MdDelete onClick={()=>deleteFromCart(item.name)}/>
                        <h5 style={{display:'flex',justifyContent:'space-between'}}>
                          {item.name}<span>Rs.{item.price}</span></h5></div>
                   )
                }):<Empty/>}   
                  </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <h4 style={{display:'flex',justifyContent:'space-between'}}>
                      Total:<span>Rs.{total}</span></h4>
                    <br/>
                    <Button style={{float:'right'}}
                    onClick={pay} disabled={check}
                    >Proceed to Pay</Button>
                  </Card.Footer>
                </Card>
              </Col>
          </Row>
        </Container>
    </>
  );
};

export default Cafepage;
