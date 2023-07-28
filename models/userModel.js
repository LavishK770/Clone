const mongoose = require('mongoose')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is Required"]
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        minlength:[6,'Password length should at atleast 6 characters'],
    }
},
    {timeStamps:true}
);


const User=mongoose.model("User",userSchema);

module.exports=User;