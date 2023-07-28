const users = require('../models/userModel');
//const errorResponse = require('../utils/errorResponse');
const bcrypt=require('bcryptjs');
const jwt =require('jsonwebtoken');
const {validationResult}=require("express-validator");

const JWT_SECRET='Kaustubh';

 const getUser=async (req,res)=>{
    let user=await users.find({});
    res.json({
       message:'list of all users',
       data:user});
};


//frontened to backend
 const postUser=async(req,res)=>{ 
   // If there are errors, return Bad request and the errors
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }
   try {
     // Check whether the user with this email exists already
     let user = await users.findOne({ email: req.body.email });
     if (user) {
       return res.status(400).json({ error: "Sorry a user with this email already exists" })
     }
 
     const salt = await bcrypt.genSalt(10);
     const secPass = await bcrypt.hash(req.body.password, salt);
 
     // Create a new user
     user = await users.create({
       username: req.body.username,
       email: req.body.email,
       password: secPass,
     });
 
     const data = {
         user: {
           id: user.id
         }
       }
       console.log(data);
       const authtoken = jwt.sign(data, JWT_SECRET);
   
       // res.json(user)
       res.json({ authtoken })
   
   } catch (error) {
     console.error(error.message);
     res.status(500).send("Internal Server Error");
   }
 };

 //update user details
 const updateUser=async(req,res)=>{
    let dataUpdate=req.body;
    //search user in db
    let node=await users.findByIdAndUpdate(req.params.id,dataUpdate);
    //if user not found then
    if(!node){
        return res.status(404).send("not found")
    }
   res.json({
    message:"User Data has been updated",
    data:node
   });
 }

 //delete users 
const deleteUser=async(req,res)=>{
    let node=await users.findById(req.params.id);
    if(!node){
        return res.status(404).send("not found")
    }
   
    node=await users.findByIdAndDelete(req.params.id);
    res.json({
        message:"data has been deleted successfully",
        data:node
    }) 
};

module.exports={
    getUser,
    postUser,
    deleteUser,
    updateUser
};
