const express=require('express');
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const path=require('path')
const cors=require('cors')
const http=require('http')
const router=express.Router();

const multer=require('multer');
const User=require("../models/user");


//method to store image on disks
//images to be stored in uploads
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './public/uploads/')
//       //stored in this detination
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now()+file.originalname)
//     }
//   });



  //this function checks if image type is jpeg/png
//   const filterImage=(req, file, cb)=>{
//    if(file.mimetype ==='image/jpeg' || file.mimetype ==='image/png'){
//        cb(null,true);
//    }else{
//        cb(null, false);
//    }

//   }

// var upload = multer({ 
//     storage:storage,
//     fileFilter:filterImage
//  });


//  upload.single('userImage')

router.post("/uploadForm",async (req,res,next)=>
{
    const {name,email,orgName,phone,empID}=req.body;
     //extract path of image stored in uploads
        // const pathName=req.file.path;
          
        //create a new user
        //new user is created if and only if there is no exsiting user with the same email id
        //model-USER
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
                                    // image:pathName,
                                    regDate:new Date()
                                
                            })


                        //else new user is created and stored in users collection

            console.log(user)
            user.save().then(user => 
                {
                    return res.json({ message: "Saved Successfully",data:user })
                })
                .catch(err => {
                    return res.json({error:"Save Unsuccessfull!Please recheck your details." })
                })
                })
                
                // else
                // {
                //     return res.status(404).json({error:"File doesn't exist"})
                // }

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

