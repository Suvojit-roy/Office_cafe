import React,{useEffect, useState} from "react";
import { Card, CardDeck, Col, Container,Row,Button} from "react-bootstrap";

import CafeNav from "./CafeNav";

const Cafepage = () => {


  const [foodItems,setFoodItems]=useState('');

  useEffect(() => {
    fetch("http://localhost:5000/cafe/foodList",
    {
      method:'POST'
    })
    .then(res=>res.json())
    .then(res=>{
      console.log(res.items)
      setFoodItems(res.items)
    })
    .catch(err=>console.log(err))

  }, [])



  // const FoodCard = () =>
  // {
  //     return(

  //       {foodItems.map(item=>
  //         {
  //           return(
            
            
           
  //           )
          
  //       })
  //     }
  //     )
  // }
       
          
       
  return (
    <>
      <CafeNav
      //   eid={eid} eimage={eimage}
      />
      <div style={{margin:"5% 5% 5% 5%",}}>
        <Container>
          <Row>
            <Col>
            <Row>
              {foodItems!='' && foodItems.map(item=>
                {
                  return(
              <Col xs={4}>
              <Card style={{marginBottom:'20px'}}>
             <Card.Img
             className="cardImage"
               variant="top"
               src={item.image}
             />
             <Card.Body>
               <Card.Title>{item.name}</Card.Title>
               <Card.Text>
                 <h4 style={{display:'flex',justifyContent:'space-between'}}>Price<span>{item.price}</span></h4>
               </Card.Text>
             </Card.Body>
             <Card.Footer>
               <Button style={{float:'right'}}>Add to Cart</Button>
             </Card.Footer>
           </Card>
          </Col>
                  )
                })}
            
              </Row>
              </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Cafepage;
