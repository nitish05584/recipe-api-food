import React, { useEffect, useRef, useState } from 'react'
import Nav from './Nav'
import categories from '../category'
import CategoryCard from './CategoryCard'
import { FaChevronCircleLeft } from "react-icons/fa"
import { FaCircleChevronRight } from "react-icons/fa6"
import { useSelector } from 'react-redux'

const UserDashboard = () => {
  const { currentCity,shopsInMyCity } = useSelector(state => state.user)

  const cateScrollRef = useRef(null)
  const shopScrollRef = useRef(null)

  const [showLeftCateButton, setShowLeftCateButton] = useState(false)
  const [showRightCateButton, setShowRightCateButton] = useState(false)

  const [showLeftShopButton, setShowLeftShopButton] = useState(false)
  const [showRightShopButton, setShowRightShopButton] = useState(false)

  // ✅ Reusable button updater
  const updateScrollButtons = (ref, setLeft, setRight) => {
    const el = ref.current
    if (!el) return

    setLeft(el.scrollLeft > 0)
    setRight(el.scrollLeft + el.clientWidth < el.scrollWidth)
  }

  const scrollHandler = (ref, direction) => {
    ref.current?.scrollBy({
      left: direction === "left" ? -200 : 200,
      behavior: "smooth",
    })
  }

  // ✅ Category scroll listener
  useEffect(() => {
    const el = cateScrollRef.current
    if (!el) return

    const handler = () =>
      updateScrollButtons(cateScrollRef, setShowLeftCateButton, setShowRightCateButton)

    handler()
    el.addEventListener('scroll', handler)
    return () => el.removeEventListener('scroll', handler)
  }, [])

  // ✅ Shop scroll listener
  useEffect(() => {
    const el = shopScrollRef.current
    if (!el) return

    const handler = () =>
      updateScrollButtons(shopScrollRef, setShowLeftShopButton, setShowRightShopButton)

    handler()
    el.addEventListener('scroll', handler)
    return () => el.removeEventListener('scroll', handler)
  }, [])

  return (
    <div className='w-full min-h-screen flex flex-col items-center bg-[#fff9f6]'>
      <Nav />

      {/* ================= Categories ================= */}
      <div className='w-full max-w-6xl flex flex-col gap-5 p-[10px]'>
        <h1 className='text-2xl sm:text-3xl'>Inspiration for your first order</h1>

        <div className='w-full relative'>
          {showLeftCateButton && (
            <button
              className='absolute left-0 top-1/2 -translate-y-1/2 bg-red-500 text-white p-2 rounded-full z-10'
              onClick={() => scrollHandler(cateScrollRef, "left")}
            >
              <FaChevronCircleLeft />
            </button>
          )}

          <div ref={cateScrollRef} className='flex overflow-x-auto gap-4 pb-2'>
            {categories.map((cate, index) => (
              <CategoryCard name={cate.category} image={cate.image} key={index} />
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

      {/* ================= Shops ================= */}
      <div className='w-full max-w-6xl flex flex-col gap-5 p-[10px]'>
        <h1 className='text-2xl sm:text-3xl'>Best Shop in {currentCity}</h1>

        <div className='w-full relative'>
          {showLeftShopButton && (
            <button
              className='absolute left-0 top-1/2 -translate-y-1/2 bg-red-500 text-white p-2 rounded-full z-10'
              onClick={() => scrollHandler(shopScrollRef, "left")}
            >
              <FaChevronCircleLeft />
            </button>
          )}

          <div ref={shopScrollRef} className='flex overflow-x-auto gap-4 pb-2'>
            {shopsInMyCity.map((shop, index) => (
              <CategoryCard name={shop.name} image={shop.image} key={index} />
            ))}
          </div>

          {showRightShopButton && (
            <button
              className='absolute right-0 top-1/2 -translate-y-1/2 bg-red-500 text-white p-2 rounded-full z-10'
              onClick={() => scrollHandler(shopScrollRef, "right")}
            >
              <FaCircleChevronRight />
            </button>
          )}
        </div>
      </div>




      <div className='w-full max-w-6xl flex flex-col gap-5 p-[10px]'>
     
      <h1 className='text-2xl sm:text-3xl'>Suggested Food Items</h1>
      </div>
    </div>
  )
}

export default UserDashboard
