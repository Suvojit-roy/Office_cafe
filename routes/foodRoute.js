const express = require('express');
const router = express.Router();
const mongoose=require('mongoose')
const Food=require('../models/food');

const fetch = require('node-fetch');
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
router.get('/foodList',async(req,res)=>
{

  //   const response1 = await fetch(
  //   'https://parseapi.back4app.com/classes/Categories',
  //   {
  //     headers: {
  //       'X-Parse-Application-Id': 'omwCX0Oq4HtEsBGQJX10jpQzSsKWZ5oloceJixzw', // This is the fake app's application id
  //       'X-Parse-Master-Key': 'URTAbTPz56HRCXmfkvu9XuDkSBCwVe95cl7MK7Oq', // This is the fake app's readonly master key
  //     }
  //   }
  // );


  // console.log(response1)
    // https://parseapi.back4app.com/classes/Categories
   
    const response = await fetch(
      'https://parseapi.back4app.com/classes/FoodItems?limit=19&keys=ItemDescription,ItemImage,ItemName,Price,objectId,updatedAt',
      {
        headers: {
          'X-Parse-Application-Id': '7SXXi17kq0JE8mrCenKZl04AxeG7SfS155SqFZJ6', // This is the fake app's application id
          'X-Parse-Master-Key': 'SxmUUxXyPcG2x7kDzEtrrchlNxuTGmYLlAnVWcS8', // This is the fake app's readonly master key
        }
      }
    );


    //res.itemname
    // .itemimage.url
    //price


    const data = await response.json(); // Here you have the data that you need
    res.status(200).send({data:data});
  ;

    //if foods is already made ,we no longer add the items anymore
    // mongoose.connection.db.collection('foods').countDocuments(function(err, count) {
        
    
    //     if( count == 0) {
    //         Food.create(items, function (err, temps) {

    //             if (err) {
    //                 console.log(err);
    //                 // terminate request/response cycle
    //                 return res.status(404).json({message:'Error saving'});
    //             }
        
    //         Food.find()
    //         .then(data=>
    //         res.status(200).json(
    //         {message:'Items Saved',items:data}))
    //         .catch(err=>res.status(404).json({error:err}))
    //          });

    //          //simply the items are returned to the ui
    //     }
    //     else {
    //         Food.find()
    //         .then(data=>
    //         res.status(200).json(
    //             {message:'Already Saved',items:data}))
    //         .catch(err=>res.status(404).json({error:err}))
    //     }
    //     //else items are saved and then returned to the UI
    // });
    
    

})





module.exports=router