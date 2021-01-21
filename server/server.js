const express=require('express');
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const multer=require('multer');
const User=require("./models/user");
const path=require('path')
const cors=require('cors')
const http=require('http')


const PORT = process.env.PORT || 5000; 

mongoose.connect(process.env.MONGODB_URI || 
    "mongodb+srv://sristi27:WJ1jcloMs2EgmE9F@cluster0.hwmrk.mongodb.net/<dbname>?retryWrites=true&w=majority",
{ useNewUrlParser: true, useUnifiedTopology: true},
(err) => {
    if (!err) {
        console.log("Database connected");
    } else {
        console.log(err);
    }
})


const app=express();
app.use(bodyparser.urlencoded({extended:false}))
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept,Authorization"
    );
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
    next();
  });





//method to store image on disks
//images to be stored in uploads
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
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

app.post("/uploadForm",upload.single('userImage'),async (req,res,next)=>
{
    const {name,email,orgName,phone,empID}=req.body;
    if(req.file)
    {
        //extract path of image stored in uploads
        const pathName=req.file.path;
        const newUser=User(
                    {
                        name,
                        email,
                        empID,
                        orgName,
                        phone,
                        image:pathName
                    }
                )
                const find=await User.findOne({email});
                if(!find)
                {
                    const save=await newUser.save();
                    try{
                        
                        res.status(200).json({message:"Saved successfully",data:save})
                        
                    }catch(err){
                        res.status(404).json({message:'User could not be saved'})
                    }
                }
                else {
                    res.status(404).json({message:'User already exists'})
                }
            
        // res.status(400).json({message:'User Image uploaded',imagePath:pathName})
    }
    else
    {
        res.status(400).json({message:'User Image does not exists'})
    }
});











if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    const path=require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}




app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
  });

