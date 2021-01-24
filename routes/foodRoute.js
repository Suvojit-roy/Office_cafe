const express = require('express');
const router = express.Router();
const mongoose=require('mongoose')
const Food=require('../models/food');


//we have taken a fixed array of food items.We render it on the screen whenever reqd.

var items=[
    {
        name:'Coffee',
        quantity:2,
        price:10,
        image:'https://coffee-brewing-methods.com/wp-content/uploads/latte-art-e1480039722212.jpg'

    },
    {
        name:'Tea',
        quantity:2,
        price:10,
        image:'https://photo2.foodgawker.com/wp-content/uploads/2019/04/3420949.jpg'

    },
    {
        name:'Coke',
        quantity:2,
        price:10,
        image:'https://smedia2.intoday.in/indiatoday/images/stories/2015January/coke-story_650_011515021116.jpg'

    },
    {
        name:'Burger',
        quantity:2,
        price:50,
        image:'https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iyrkDmkO4d7w/v1/1000x-1.jpg'
    },
    {
        name:'Pizza',
        quantity:2,
        price:50,
        image:' https://www.tasteofhome.com/wp-content/uploads/2018/01/Chicken-Pizza_exps30800_FM143298B03_11_8bC_RMS-2.jpg'

    },
    {
        name:'Noodles',
        quantity:2,
        price:50,
        image:'https://shwetainthekitchen.com/wp-content/uploads/2020/07/IMG_0100.jpg'
    }
   ];





//This route creates a new collection named foods and stores all the items in there.
router.post('/foodList',(req,res)=>
{


    //if foods is already made ,we no longer add the items anymore
    mongoose.connection.db.collection('foods').countDocuments(function(err, count) {
        
    
        if( count == 0) {
            Food.create(items, function (err, temps) {

                if (err) {
                    console.log(err);
                    // terminate request/response cycle
                    return res.status(404).json({message:'Error saving'});
                }
        
            Food.find()
            .then(data=>
            res.status(200).json(
            {message:'Items Saved',items:data}))
            .catch(err=>res.status(404).json({error:err}))
             });

             //simply the items are returned to the ui
        }
        else {
            Food.find()
            .then(data=>
            res.status(200).json(
                {message:'Already Saved',items:data}))
            .catch(err=>res.status(404).json({error:err}))
        }
        //else items are saved and then returned to the UI
    });
    
    

})


module.exports=router