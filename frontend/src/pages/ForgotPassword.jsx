
import axios from 'axios';
import React, { useState } from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';



const ForgotPassword = () => {
    const [step,setStep]=useState(1)

    const [email,setEmail]=useState("")

    const [otp,setOtp]=useState("")

     const [newPassword,setNewPassword]=useState("")

      const [confirmPassword,setConfirmPassword]=useState("")

    const navigate=useNavigate()

     const [err,setErr]=useState("") 

    const handleSendOtp=async()=>{
        try {
            const result=await axios.post(`${serverUrl}/api/auth/send-otp`,{email},{withCredentials:true})
            console.log(result)
            setErr("")
            setStep(2)
        } catch (error) {
            setErr(error.response.data.message)
        }

    }


    const handleVerifyOtp=async()=>{
        try {
            const result=await axios.post(`${serverUrl}/api/auth/verify-otp`,{email,otp},{withCredentials:true})
            console.log(result)
            setErr("")
            setStep(3)
        } catch (error) {
            setErr(error.response.data.message)
        }

    }



    const handleResetPassword=async()=>{
        if(newPassword!=confirmPassword){
            return null
        }
        try {
            const result=await axios.post(`${serverUrl}/api/auth/reset-password`,{email,newPassword},{withCredentials:true})
            console.log(result)
            setErr("")
            navigate("/signin")
           
        } catch (error) {
            setErr(error.response.data.message)
        }

    }




  return (
    <div className='min-h-screen w-full flex items-center justify-center p-4 bg-amber-50'>

        <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8 border border-[#ddd]'>

            <div className='flex items-cneter gap-4 mb-4'onClick={()=>navigate("/signin")}>

            <IoMdArrowBack size={30} className='text-red-500'/>
            <h1 className='text-2xl font-bold text-center text-red-500'>Forgot Password</h1>
            </div>


           {step==1 && 
            <div>
               <div className='mb-4 mt-6'>
                <label htmlFor="email" className='block text-gray-700 font-medium mb-1'> Email</label>
                <input type="email"className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500'placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)} value={email}  required/>
            </div>
            <button className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 bg-red-500 hover:bg-red-400 cursor-pointer text-white'onClick={handleSendOtp} >send Otp</button>

            <p className='text-green-500 text-center'>{err}</p>
   
           </div>
           
           }





{step==2 && 
            <div>
               <div className='mb-4 mt-6'>
                <label htmlFor="email" className='block text-gray-700 font-medium mb-1'> OTP</label>
                <input type="number"className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500'placeholder='Enter Otp' onChange={(e)=>setOtp(e.target.value)} value={otp}  required/>
            </div>
            <button className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 bg-red-500 hover:bg-red-400 cursor-pointer text-white' onClick={handleVerifyOtp}>Verify</button>
            <p className='text-green-500 text-center'>{err}</p>
           </div>
           
           }




{step==3 && 
            <div>
               <div className='mb-4 mt-6'>
                <label htmlFor="newPassword" className='block text-gray-700 font-medium mb-1'> New Password</label>
                <input type="email"className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500'placeholder='Enter New Password' onChange={(e)=>setNewPassword(e.target.value)} value={newPassword}  required/>
            </div>

            <div className='mb-4 mt-6'>
                <label htmlFor="confirmPassword" className='block text-gray-700 font-medium mb-1'> Confirm Password</label>
                <input type="email"className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500'placeholder=' Confirm Password' onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword}  required/>
            </div>

            <button className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 bg-red-500 hover:bg-red-400 cursor-pointer text-white' onClick={handleResetPassword}>Reset Password</button>
            <p className='text-green-500 text-center'>{err}</p>
           </div>
           
           }









    
          


        </div>
      
    </div>
  )
}

export default ForgotPassword

