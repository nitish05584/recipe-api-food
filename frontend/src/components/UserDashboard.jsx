import React, { useEffect, useRef, useState } from 'react'
import Nav from './Nav'
import categories from '../category'
import CategoryCard from './CategoryCard'
import { FaChevronCircleLeft } from "react-icons/fa"
import { FaCircleChevronRight } from "react-icons/fa6"
import { useSelector } from 'react-redux'

const UserDashboard = () => {
  const {currentCity}=useSelector(state=>state.user)
  const cateScrollRef = useRef(null)

  const [showLeftCatetButton, setShowLeftCateButtton] = useState(false)
  const [showRightCateButton, setShowRightCateButtton] = useState(false)

  const updateButton = () => {
    const element = cateScrollRef.current
    if (element){

    setShowLeftCateButtton(element.scrollLeft > 0)
    setShowRightCateButtton(
      element.scrollLeft + element.clientWidth < element.scrollWidth

    )
  }
  }

  const scrollHandler = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth"
      })
    }
  }

  useEffect(() => {
    const el = cateScrollRef.current
    if (!el) return

    updateButton() 
    el.addEventListener('scroll', updateButton)

    return () => el.removeEventListener('scroll', updateButton)
  }, [])

  return (
    <div className='w-full min-h-screen flex flex-col items-center bg-[#fff9f6]'>
      <Nav />

      <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]'>

        <h1 className='text-gray-800 text-2xl sm:text-3xl'>
          Inspiration for your first order
        </h1>

        <div className='w-full relative'>
          {showLeftCatetButton && (
            <button
              className='absolute left-0 top-1/2 -translate-y-1/2 bg-red-500 text-white p-2 rounded-full z-10'
              onClick={() => scrollHandler(cateScrollRef, "left")}
            >
              <FaChevronCircleLeft />
            </button>
          )}

          <div
            className='w-full flex overflow-x-auto gap-4 pb-2'
            ref={cateScrollRef}
          >
            {categories.map((cate, index) => (
              <CategoryCard data={cate} key={index} />
            ))}
          </div>

          {showRightCateButton && (
            <button
              className='absolute right-0 top-1/2 -translate-y-1/2 bg-red-500 text-white p-2 rounded-full z-10'
              onClick={() => scrollHandler(cateScrollRef, "right")}
            >
              <FaCircleChevronRight />
            </button>
          )}
        </div>




      </div>



      <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]'>

      <h1 className='text-gray-800 text-2xl sm:text-3xl'>Best Shop in {currentCity}
          
        </h1>
      </div>


    </div>
  )
}

export default UserDashboard
