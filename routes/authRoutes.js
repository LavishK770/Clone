const express=require('express')
const { getUser,postUser,deleteUser,updateUser } = require('../controllers/authController')

//router object
const userRouter= express.Router()

//routes

userRouter
.route("/")
.get(getUser)
.post(postUser)

//params
userRouter
.route("/:id")
.delete(deleteUser)
.patch(updateUser)

module.exports=userRouter;