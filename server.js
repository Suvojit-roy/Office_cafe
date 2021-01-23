const express=require('express');
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const path=require('path')
const cors=require('cors')
const http=require('http')



const PORT = process.env.PORT || 5000; 

mongoose.connect(process.env.MONGODB_URI || 
    "mongodb+srv://sristi27:WJ1jcloMs2EgmE9F@cluster0.hwmrk.mongodb.net/<user>?retryWrites=true&w=majority",
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

app.use(express.json());
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





app.use("/add",require('./server/routes/userRoute'));
app.use("/cafe",require('./server/routes/foodRoute'));




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

