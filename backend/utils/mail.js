const nodemailer = require("nodemailer");
const dotenv=require("dotenv")
dotenv.config()
const transporter = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    secure: true, 
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  const sendOtpMail=async(to,otp)=>{
    await transporter.sendMail({
        from:process.env.EMAIL,
        to:to,
        subject:"Reset your Password",
        html:`<p>Your OTP for password reset is<b>${otp}</b>.It expires in 5minutes.</p>`
    })

  }

  module.exports=sendOtpMail;