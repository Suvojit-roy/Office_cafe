const express=require('express');
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const path=require('path')
const cors=require('cors')
const http=require('http')
const router=express.Router();
const stripe=require("stripe")("sk_test_51IpczwSH2HRN2Fzs9KpJpmMH3VCqaAMVsHLn4g97qdCm3FFjNHKjnESbnWUuOegnC1FHCI6l9OxqY3fr5CBvVqXf007qCfTJBN")
const { v4: uuidv4 } = require('uuid');



router.post('/payment',(req,res)=>{
    const {product,token}=req.body;
    // console.log("PRODUCT",product);
    // console.log("PRICE",product.price);
    const idempotencyKey= uuidv4()

    return stripe.customers.create({
        email:token.email,
        source: token.id
    }).then(customer=>{
        stripe.charges.create({
            amount:product.price*100,
            currency:'usd',
            // customer:customer.id,
            receipt_email:token.email,
            // description:product.name
        },{idempotencyKey})
    })
    .then(result=> res.status(200).json(result))
    .catch(err=>console.log(err))
})

module.exports=router