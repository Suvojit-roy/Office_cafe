const express=require('express');
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const path=require('path')
const cors=require('cors')
const http=require('http')
const router=express.Router();

const multer=require('multer');
const User=require("../../models/user");


//method to store image on disks
//images to be stored in uploads
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
  });

  const fileFilter=(req, file, cb)=>{
   if(file.mimetype ==='image/jpeg' || file.mimetype ==='image/jpg' || file.mimetype ==='image/png'){
       cb(null,true);
   }else{
       cb(null, false);
   }

  }

var upload = multer({ 
    storage:storage,
    fileFilter:fileFilter
 });




router.post("/uploadForm",upload.single('userImage'),async (req,res,next)=>
{
    const {name,email,orgName,phone,empID}=req.body;
    if(req.file)
    {
        //extract path of image stored in uploads
        const pathName=req.file.path;
          
    User.findOne({ email })
    	.then((savedUser) => {
        	if (savedUser) {
            	return res.status(404).json({ error: "User already exists!" });

        	}
        	const user = new User(
                        	{
                            	
                                    name,
                                    email,
                                    empID,
                                    orgName,
                                    phone,
                                    image:pathName
                                
                            })
            user.save().then(user => 
                {
                    return res.json({ message: "Saved Successfully",data:user })
                })
                .catch(err => {
                    return res.json({error: "Save unsuccessful!" })
                
                        	})

                    })
                }
                else
                {
                    return res.status(404).json({error:'Unscuccessfull'})
                }
});


router.get("/fetchDetails/:id",(req,res)=>
{

    User.findById({_id:req.params.id}).then(user=>
        {
            return res.status(200).json({message:"Data fetched",data:user})
        })
        .catch(err=>
            {
                return res.json(404).json({error:'Fetch unsuccessfull'})
            })


})








module.exports=router

