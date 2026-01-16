const express=require("express");
const { signUp, signIn, signOut, sendOtp, verifyOtp, resetPassword, googleAuth } = require("../controllers/auth.controllers");


const authRouter=express.Router()

authRouter.post("/signup",signUp)

authRouter.post("/signIn",signIn)

authRouter.get("/signout",signOut)

authRouter.post("/send-otp",sendOtp)


authRouter.post("/verify-otp",verifyOtp)

authRouter.post("/reset-password",resetPassword)


authRouter.post("/google-auth",googleAuth)







module.exports=authRouter