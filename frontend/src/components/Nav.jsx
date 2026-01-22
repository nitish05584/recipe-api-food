
import React, { useState } from 'react'

import { IoLocationSharp } from "react-icons/io5";

import { IoSearchSharp } from "react-icons/io5";

import { LuShoppingCart } from "react-icons/lu";

import { useDispatch, useSelector } from 'react-redux';

import { RxCross2 } from "react-icons/rx";
import { serverUrl } from '../App';

import { setUserData } from '../redux/userSlice';

import { FaPlus } from "react-icons/fa6";

import { TbReceipt2 } from "react-icons/tb";

import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Nav = () => {
    const {userData,currentCity,cartItems}=useSelector(state=>state.user)
  
    const {myShopData}=useSelector(state=>state.owner)

    const [showInfo,setShowInfo]=useState(false)

    const [showSearch,setShowSearch]=useState(false)

    const dispatch=useDispatch()

    const navigate=useNavigate()

    const handleLogOut=async()=>{
      try {
        const result=await axios.get(`${serverUrl}/api/auth/signout`,{withCredentials:true})
        dispatch(setUserData(null))
        
      } catch (error) {
        console.log(error)
      }

    }
  return (
    <div className='w-full h-[80px] flex items-center justify-between md:justify-center gap-[30px] px-[20px] fixed top-0 z-[9999] bg-[#fff9f6] overflow-visible'>


        {showSearch && userData.role=="user" &&   <div className='w-[90%] h-[60px] bg-white shadow-xl rounded-lg  flex items-center gap-[20px] fixed top-[80px] left-[5%] md:hidden'>

<div className='flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400'>
<IoLocationSharp size={20} className='text-red-500'/>
<div className='w-[80%] truncate text-gray-600'>{currentCity}</div>
</div>



<div className='w-[80%] flex items-center gap-[10px] px-2'>
<IoSearchSharp size={20} className='text-red-400 ' />
<input type="text"placeholder="search delicious food..." className='px-[10px] text-gray-700 outline-0 w-full'/>
</div>


</div>}




        <h1 className='text-3xl font-bold mb-2 text-red-500'>Vingo</h1>
       
        {userData.role=="user" &&
       <div className='md:w-[60%] lg:w-[40%] h-[60px] bg-white shadow-xl rounded-lg hidden md:flex items-center '>


         <div className='flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400'>
         <IoLocationSharp size={20} className='text-red-500'/>
         <div className='w-[80%] truncate text-gray-600'>{currentCity}</div>
         </div>



         <div className='w-[80%] flex items-center gap-[10px] px-2'>
         <IoSearchSharp size={20} className='text-red-400 ' />
         <input type="text"placeholder="search delicious food..." className='px-[10px] text-gray-700 outline-0 w-full'/>
         </div>


       </div>

        }




        <div className='flex items-center gap-4'>
            {userData.role=="user" &&  ( showSearch?<RxCross2 size={20} className='text-red-400 md:hidden cursor-pointer'onClick={()=>setShowSearch(false)}/>:
        <IoSearchSharp size={20} className='text-red-400 md:hidden cursor-pointer'onClick={()=>setShowSearch(true)} />
            )}


          {userData.role=="owner" ? <>
          {myShopData && <>
            <button className='hidden md:flex items-center gap-1 p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-red-500' onClick={()=>navigate("/add-item")}>
            <FaPlus size={20}  />
            <span>Add Food Item</span>

            </button>


            <button className='md:hidden flex items-center  p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-red-500'onClick={()=>navigate("/add-item")}>
            <FaPlus size={20}  />
            </button> </>}



            <div className='hidden  md:flex items-center gap-2 cursor-pointer relative px-3 py-1 rounded-full bg-[#ff4d2d]/10 text-red-500 font-medium'>
            <TbReceipt2 size={20}/>
            <span>My Orders</span>
            <span className='absolute -right-2 -top-2 text-xs font-bold text-white bg-red-500 rounded-full px-[6px] py-[1px]'>0</span>
            </div>


            <div className='md:hidden  flex items-center gap-2 cursor-pointer relative px-3 py-1 rounded-full bg-[#ff4d2d]/10 text-red-500 font-medium'>
            <TbReceipt2 size={20}/>
          
            <span className='absolute -right-2 -top-2 text-xs font-bold text-white bg-red-500 rounded-full px-[6px] py-[1px]'>0</span>
            </div>

            </>:(
              <>
                <div className='relative cursor-pointer'onClick={()=>navigate("/cart")}>
       <LuShoppingCart size={25} className='text-red-500'/>
         <span className='absolute right-[-9px] top-[-12px] text-red-500'>{cartItems.length}</span>
       </div>



     <button className='hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-red-500 text-sm font-medium'>My Orders</button>
              </>

            )}




       




     <div className='w-[40px] h-[40px] rounded-full flex items-center justify-center bg-red-500 text-white text-[18px] shadow-xl font-semibold cursor-pointer' onClick={()=>setShowInfo(prev=>!prev)}> 

       {userData?.fullName.slice(0,1)} 

     </div>

     {showInfo &&

     <div className='fixed top-[80px] md:right-[10%] lg:right-[25%] w-[180px] bg-white shadow-2xl rounded-xl p-[20px] flex flex-col gap-[10px] z-[9999]'>
        <div className='text-[17px] font-semibold' >
            {userData.fullName}
        </div>

        {userData.role=="user" &&
        <div className='md:hidden text-red-500 font-semibold cursor-pointer'>My Orders</div>}

        <div className='text-red-500 font-semibold cursor-pointer'onClick={handleLogOut}>Log Out</div>

     </div>
     }

     </div>

    </div>
  )
}

export default Nav
