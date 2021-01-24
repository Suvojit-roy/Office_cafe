import React,{useEffect, useState} from "react";
import LoadingOverlay from 'react-loading-overlay';
import { Card, Col, Container,Row,Button} from "react-bootstrap";
import {MdDelete} from 'react-icons/md';
import CafeNav from "./CafeNav";
import { useParams } from "react-router-dom";



const Cafepage = () => {


const {id}=useParams();

  
const [cart,setCart]=useState([]);
const [loading,setLoading]=useState(true)
const [foodItems,setFoodItems]=useState('');
const [total,setTotal]=useState(0);
const [paymentMode,setPaymentMode]=useState('cash');


//card states
const [cardname,setCardName]=useState('ABC');
const [expiry,setExpiry]=useState('12/24');
const [cvv,setCvv]=useState('033');
const [cardnumber,setCardNumber]=useState('');




  //calls the route on the backend which saves the food array to the database and returns the items.
  useEffect(() => {
    fetch("/cafe/foodList",
    {
      method:'POST'
    })
    .then(res=>res.json())
    .then(res=>{
      setFoodItems(res.items);
      //returned data is stored in foodItems
      setLoading(false);
    })
    .catch(err=>alert(err.error))


    // console.log(JSON.parse(localStorage.getItem('cart')));

  }, [])



//add to cart functionality is implemented
const addToCart = (itemName,price,quantity) =>
{

   //if cart is not empty then we check if the added item is already present in the cafe or not.
   
   if(cart.length!=0)
   {
      var item=cart.find(({ name }) => name === itemName)

      //If present,we simply increase the quantity and add up the price
      if(item) 
      {
        item.quantity=item.quantity+1;
        item.price=item.price+price;
        setTotal(total+price)
        setCart(cart)
        
      }
      //else we create a new item and push it to the existing array
      else 
      {
        setCart([...cart,{name:itemName,price,quantity}])
        setTotal(total+price);
      }
   }

   //else we create a new item and push into the empty array
   else
   {
    setCart([...cart,{name:itemName,price,quantity}])
    setTotal(total+price);
   }


   localStorage.setItem('cart',JSON.stringify(cart))
   
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



//renders UI when the cart is empty
const Empty = () =>
{
    return (
      <div>
<h4>Your Cart is Empty</h4>
      </div>
    )
}


//implemented the delete functionality using this function
const deleteFromCart = (itemName) =>
{
    var item=cart.find(({name})=>name===itemName)
    var newcart=cart.filter(item=>item.name!=itemName);
    console.log(newcart)
    setTotal(total-item.price);
    setCart(newcart);
}




//completely clears the cart if there are existing items
const clearCart = () =>
{
   setCart([]);
   setTotal(0);
}



//This function starts a timer for an interval(takeaway time for the order)
const pay = () =>
{
   setLoading(true);
   alert(`Payment Processing with ${paymentMode}!`);
   setTimeout(() => {
     setLoading(false)
     clearCart();

     alert("Payment Completed...Enjoy your meal!");
   }, 3000);
}




//maps over foodItems and prints them in a grid format
const FoodGrid = ({item}) =>
{
   return (
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
}

  
//displays cart Items by map over items in the cart
const CartDiv = ({item}) =>
{
   return (
    <div  style={{display:'flex',justifyContent:'space-between'}}>
    <h5>
    <MdDelete onClick={()=>deleteFromCart(item.name)}/>
    {item.name}(<span style={{color:'gray',fontSize:'15px'}}>qty:</span>{item.quantity})
    </h5>
    <h5>Rs.{item.price}</h5>
    </div>

   )
}




//renders food items grid and cart box in a flex display
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
                     <FoodGrid item={item}/>
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
                     <CartDiv item={item}/>
                   )
                }):<Empty/>}   

                  </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <h4 style={{display:'flex',justifyContent:'space-between'}}>
                      Total:<span>Rs.{total}</span></h4>
                    <br/>
                    {cart.length!=0?
                    <div  style={{display:'flex',justifyContent:'space-between'}}>
                    Pay using: 
                    <div>
                    <label style={{marginRight:'10px'}}>
                      
                      <input type="radio" name="pay" 
                                 value='cash'
                                 checked={paymentMode=='cash'} 
                                 onChange={()=>setPaymentMode('cash')}/>
                                 Cash</label>


                    <label>
                      <input type="radio" name="pay" 
                                 value='card'
                                 checked={paymentMode=='card'} 
                                 onChange={()=>setPaymentMode('card')}/>
                                 Card</label>
                    </div>
                  </div>
                  :''}

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
