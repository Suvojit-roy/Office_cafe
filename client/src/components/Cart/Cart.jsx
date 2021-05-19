import React from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import Navbar from '../Navbar/Navbar';
import './cartStyles.css'

const Cart = ({items,amount,removeItem,decreaseItem,increaseItem,clearCart}) => {


    let history=useHistory()
    const {id}=useParams();

    const CartItem = ({increase,decrease,deleteItem}) =>
    
    
    items.length ?
    (  
        items.map(item=>{
            return(
               
                
                <div className="cart-item">
                <div className="left-text">
                <button className="remove"
                onClick={()=>deleteItem(item.objectId)}>
                    <i className="fa fa-trash">
                        </i></button>
                    
                <div className="item-img">
                <img src={item.ItemImage.url} alt={item.ItemName} />
                </div>

                <div className="item-desc">
                <span className="name text-dark">{item.ItemName}</span><br></br>
                <span className="price text-secondary">₹{item.Price}</span>
                </div>


                    </div>
                    <div className="right-text">
                    <button className="add"
                    onClick={()=>increase(item.objectId)}>
                        <i className="fa fa-plus"></i></button>
                     <span className="quantity">{item.quantity}</span>
                     <button className="decrease"
                     onClick={()=>decrease(item.objectId)}>
                     <i className="fa fa-minus"></i></button>
                    </div>
                </div>                  
            )
        })
    ):

     (
        <p class="clear-bag">
            <h1>Ooops!</h1> You have nothing here </p>
     )



     const pay = () =>
     {
        alert('Payment under process');
        //dispatch clear cart from here
     }

    const deleteItem =(id) =>
    {
        removeItem(id);
    }

    const increase = (id)  =>{
        increaseItem(id);
    }

    const decrease = (id) => 
    {
        decreaseItem(id);
    }

    
    return (

        
        < div className="home-container cart-container">
            <Navbar userId={id}/>
        
        <section className="banner" id="banner">
            <div className="cart-content">
           {items.length>0 ? 
           <h5 className="title">Order Summary<div></div></h5>:''}
            <div className="collection">
               <CartItem increase={increase} decrease={decrease}
               deleteItem={deleteItem}/>
             
            {items.length>0 ?
                <div>
                     <div 
              style={{borderBottom:'2px solid lightgrey',
              width:'85%',
              margin:'10px auto'}}/>
               
                    <div className="totalAmt">
            <h4>Total</h4>
            <h5>₹ {amount}</h5>
           </div> 
           <div className="cart-btn">
                <button onClick={()=>clearCart()}>
                    Clear Cart</button>
                    <button onClick={()=>history.goBack()}>
                    Back to Menu Page</button>
                    <button onClick={()=>pay()}>
                    Proceed To Pay
                    </button>
                   </div>
            </div>
            :<div className="cart-btn back-btn">
            <button onClick={()=>history.goBack()}>
                Go Back to Menu Page</button></div>}
    </div>
</div>
        </section>
        </ div>

    )
}

const mapStateToProps = (state)=>{
    return{
        items: state.cart,
        amount:state.amount
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        removeItem: (id)=>{
            dispatch({ 
                        type: "REMOVE_ITEM", 
                        payload:id
         });
       },
        increaseItem: (id)=>{
            dispatch({ 
                        type: "INCREASE_ITEM", 
                        payload:id
        });
        },
        decreaseItem: (id)=>{
            dispatch({ 
                        type: "DECREASE_ITEM", 
                        payload:id
        });
    },
        clearCart: ()=>{
            dispatch({ 
                        type: "CLEAR_CART", 
                        payload:null
        });
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart)
