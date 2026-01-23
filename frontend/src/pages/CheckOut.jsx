
import React, { useEffect, useState } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";

import { IoMdSearch } from "react-icons/io";

import { TbCurrentLocation } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';

import "leaflet/dist/leaflet.css"
import { setLocation } from '../redux/mapSlice';

function RecenterMap({location}){
    if(location.lat && location.lon){
        const map=useMap()
        map.setView([location.lat,location.lon],16,{animate:true})
    }
    return null
   
}

function CheckOut() {
    const { location, address } = useSelector(state => state.map)
    const dispatch=useDispatch()

const onDragEnd=(e)=>{
   
    const {lat,lng}=e.target._latlng
    dispatch(setLocation({lat,lon:lng}))
    
}
   


    return (
        <div className='min-h-screen bg-[#fff9f6] flex items-center justify-center p-6'>
            <div className='absolute top-[20px] left-[20px] z-[10] ' onClick={() => navigate("/")}>

                <IoIosArrowRoundBack size={40} className='text-red-500' />
            </div>


            <div className='w-full max-w-[900px] bg-white rounded-2xl shadow-xl p-6 space-y-6'>

                <h1 className='text-2xl font-bold text-gray-800'>Checkout</h1>

                <section>
                    <h2 className='text-lg font-semibold mb-2 flex items-center gap-2 text-gray-800'><FaLocationDot className='text-red-500' />
                        Delivery Location</h2>

                    <div className='flex gap-2 mb-3'>
                        <input type="text" className='flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]' placeholder='Enter your Delivery Address...' value={address} readOnly/>

                        <button className='bg-red-500 hover:bg-red-500 text-white px-3 py-2 rounded-lg flex items-center justify-center'><IoMdSearch />
                        </button>

                        <button className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center justify-center'><TbCurrentLocation /></button>
                    </div>


                    <div className='rounded-xl border overflow-hidden'>
                        <div className='h-64 w-full flex items-center justify-center'>

                            <MapContainer className={"w-full h-full"}

                                center={[location?.lat, location?.lon]}
                                zoom={16}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <RecenterMap location={location}/>
                                  <Marker position={[location?.lat, location?.lon]} draggable eventHandlers={{dragend:onDragEnd}}/>

                            </MapContainer>


                        </div>
                    </div>
                </section>

            </div>
        </div>
    )
}

export default CheckOut
