const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    orgName:
    {
        type: String,
        required: true
    },
    empID:
    {
        type: Number,
        required: true
    },
    phone:
    {
        type: Number,
        required: true
    },
    email:
    {
        type: String,
        required: true
    },
    // image:
    // {
    //     type:String,
    //     // required:true
    // },
    regDate:
    {
        type:Date,
        required:true
    }
});

module.exports=mongoose.model('User',UserSchema)