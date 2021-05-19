import React from 'react'
import { useState } from 'react';

import { Card, Col} from "react-bootstrap";
import { Link } from 'react-router-dom';

const CafePageItem = ({item,addToCart,id}) => {

  // console.log(item,addToCart)
  const [flag,setFlag]=useState(false)
    return (
            <>
                <Col lg={4} md={6} xs={12}>
                <Card style={{marginBottom:'20px'}}>
               <Card.Img
               className="cardImage"
                 variant="top"
                 src={item.ItemImage.url}
                 alt={item.ItemName}
               />
               <Card.Body>
                 <Card.Title><h4>{item.ItemName}</h4>
                 </Card.Title>

                 <Card.Text>
                   <h4 style={{display:'flex',justifyContent:'space-between'}}>
                     <h5 style={{color:'gray'}}>Price</h5>
                     <span>Rs.{item.Price}</span></h4>
                 </Card.Text>
               </Card.Body>
               <Card.Footer>
                {flag==false ? <button className="addToCart"
                  onClick={()=>
                    {
                      setFlag(true);
                      addToCart(item.objectId)
                  }}
                 >Add to Cart</button> : 
                <Link to={`/cart/${id}`} >
                <button className="addToCart">
                   View Bag</button></Link>
                   }

               </Card.Footer>
             </Card>
            </Col>
            </>
    )
}

export default CafePageItem



//store - data is stored,think of state
//reducer - updates data and state based on actions displatched