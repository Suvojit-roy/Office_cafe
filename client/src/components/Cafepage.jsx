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




const addToCart = (itemName,price,quantity) =>
{
   if(cart.length!=0)
   {
      var item=cart.find(({ name }) => name === itemName)
      console.log(item)
      if(item) 
      {
        item.quantity=item.quantity+1;
        item.price=item.price+price;
        setTotal(total+price)
        setCart(cart)
        
      }
      else 
      {
        setCart([...cart,{name:itemName,price,quantity}])
        setTotal(total+price);
      }
   }
   else
   {
    setCart([...cart,{name:itemName,price,quantity}])
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
<h4>Your Cart is Empty</h4>
      </div>
    )
}


const deleteFromCart = (itemName) =>
{
    var item=cart.find(({name})=>name===itemName)
    var newcart=cart.filter(item=>item.name!=itemName);
    console.log(newcart)
    setTotal(total-item.price);
    setCart(newcart);
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

     alert("Payment Completed...Enjoy your meal!");
   }, 3000);
}
  //  console.log(JSON.parse(localStorage.getItem('cart')))


       
  return (
    <>
      <CafeNav id={id}/>

      {foodItems.length==0 && loading?<Spin message="Loading Cafe Menu"/>:''}
      {foodItems && loading?<Spin message="Processing your payment"/>:''}
        <Container style={{margin:'10px auto'}}>
          <Row>
            <Col xs={8}>
            <Row>
              {foodItems!='' && foodItems.map((item)=>
                {
                  return(
              <Col xs={6}>
              <Card style={{marginBottom:'20px'}}>
             <Card.Img
             className="cardImage"
               variant="top"
               src={item.image}
             />
             <Card.Body>
               <Card.Title><h4>{item.name}</h4></Card.Title>
               <Card.Text>
                 <h4 style={{display:'flex',justifyContent:'space-between'}}>
                   <h5 style={{color:'gray'}}>Price</h5>
                   <span>Rs.{item.price}</span></h4>
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
              <Col xs={4}>
                <Card>
                  <Card.Title><h3 style={{textAlign:'center'}}>Cart</h3></Card.Title>
                  <Card.Body>
                  <Card.Text>
                {cart.length!=0 ? 
                cart.map((item)=>
                {
                   return (
                      <div  style={{display:'flex',justifyContent:'space-between'}}>
                        <h5>
                        <MdDelete onClick={()=>deleteFromCart(item.name)}/>
                        {item.name}({item.quantity})
                        </h5>
                        <h5>Rs.{item.price}</h5>
                        </div>
                   )
                }):<Empty/>}   
                  </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <h4 style={{display:'flex',justifyContent:'space-between'}}>
                      Total:<span>Rs.{total}</span></h4>
                    <br/>
                    {cart.length!=0?<Button onClick={clearCart}>Empty Cart</Button>:''}
                    <Button style={{float:'right'}}
                    onClick={pay} disabled={cart.length==0}
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
