const express=require('express')
const { registerController, loginController, logoutController } = require('../controllers/authController')

//router object
const router= express.Router()

//routes

//register k liye
router.post('/register',registerController);

//login k liye
router.post('/login',loginController);

//logout k liye
router.post('/logout',logoutController);
module.exports=router