const express=require('express');
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const path=require('path')
const cors=require('cors')
const http=require('http')
const router=express.Router();

const multer=require('multer');
const User=require("../models/user");


router.post("/uploadForm",async (req,res,next)=>
{
    const {name,email,orgName,phone,empID,image}=req.body;
        User.findOne({ email })
    	.then((savedUser) => {
        	if (savedUser) {
            	return res.status(404).json({ error: "User already exists!" });
                //error is returned
        	}
        	const user = new User(
                        	{
                            	
                                    name,
                                    email,
                                    empID,
                                    orgName,
                                    phone,
                                    image,
                                    regDate:new Date()
                                
                            })


                        //else new user is created and stored in users collection

            user.save().then(user => 
                {
                    return res.json({ message: "Saved Successfully",data:user })
                })
                .catch(err => {
                    return res.json({error:"Save Unsuccessfull!Please recheck your details." })
                })
                })

            });


router.get("/fetchDetails/:id",(req,res)=>
{

    //details of user is fetched using the specific id in req params
    User.findById({_id:req.params.id}).then(user=>
        {
            return res.status(200).json({message:"Data fetched",data:user})
            //fetched data is returned
        })
        .catch(err=>
            {
                return res.json(404).json({error:'Fetch unsuccessfull'})
            })


})








module.exports=router

