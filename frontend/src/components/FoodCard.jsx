import React from 'react'
import { FaLeaf } from "react-icons/fa";
import { FaDrumstickBite } from "react-icons/fa";

import { FaStar } from "react-icons/fa";


function FoodCard({data}) {

  const renderStars=(rating)=>{
    const stars=[];

    for(let i=1; i<=5; i++){
    stars.push(
      (i<=rating)?(<FaStar />)
        
      
    )
    }
  }
  return (
    <div className='w-[250px] rounded-2xl border-2 border-red-500 bg-white shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col'>
        <div className='relative w-full h-[170px] flex justify-center items-center bg-white'>
           <div className='absolute top-3 right-3 bg-white rounded-full p-1 shadow'> {data.foodType=="veg"?<FaLeaf className='text-green-600 text-lg' />:<FaDrumstickBite className='text-red-600 text-lg' />}</div>

          <img src={data.image} alt="" className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'/>
        </div>

        <div className='flex-1 flex flex-col p-4'>
          <h1 className='font-semibold text-gray-900 text-base truncate'>{data.name}</h1>

        </div>
      
    </div>
  )
}

export default FoodCard
