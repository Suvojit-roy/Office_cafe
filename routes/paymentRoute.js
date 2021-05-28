const express=require('express');
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const path=require('path')
const cors=require('cors')
const http=require('http')
const router=express.Router();
const stripe=require("stripe")("sk_test_51IpczwSH2HRN2FzsEDNbqB8YgUfdScGZ4RwlycM9EaWeAuCDSqLBuGboLyTMD4Dsu6vdLltmmvxLcsSgAyMckUXs00bnZBYkZk")
const { v4: uuidv4 } = require('uuid');



router.post('/payment',(req,res)=>{

    const {product,token}=req.body;
    const idempotencyKey= uuidv4()
    console.log(product)
    return stripe.customers.create({
        email:token.email,
        source: token.id
    }).then(customer=>{
        stripe.charges.create({
            amount:product.price,
            currency:'inr',
            receipt_email:token.email
        },{idempotencyKey})
    })
    .then(result=> res.status(200).json(result))
    .catch(err=>console.log(err))
})

module.exports=router