const {SENDGRID_API} = require('./../config/keys');
const express=require('express')
const nodemailer = require('nodemailer')
// const sendGridTransport = require('nodemailer-sendgrid-transport');




const router=express.Router()

//transporter creation
const transporter = 
nodemailer.createTransport({
    service:'gmail',
    auth:{
     user:'noreply.officeeats@gmail.com',
     pass:'123**567'
    }
})




router.post('/send', (req, res) => {
    const {html,message, subject,to} = req.body
    var mailOptions=
    {
        from:'noreply.officeeats@gmail.com',
        to:to,
        subject:subject,
        html:html

    }
    transporter.sendMail(mailOptions,
        function(error,info)
        {
            if(error) return res.status(404).json({error:'Message could not be delivered'})
        
        else{
            res.status(200).json({message:"We have sent a mail on your email Adress.Please check it for further details"})
        }
    })
})


module.exports=router