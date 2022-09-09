import React from 'react'
import img from '../img/cart.jpg'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/skyblue';
import { useState } from 'react';
import UseFetch from '../hooks/useFetch';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate()
  const electronic = UseFetch('/prod/filter?prCategory=electronic') 
  const itemsElec = electronic.data.products

  const toys = UseFetch('/prod/filter?prCategory=toys') 
  const itemsToy = toys.data.products

  const fashion = UseFetch('/prod/filter?prCategory=fashion') 
  const itemsFash= fashion.data.products

  return (
    <div>
      
        <div  className="bg-coverImg h-96 bg-fixed bg-cover bg-center flex flex-col justify-center items-center gap-5 ">
                <h1 className='text-bold text-2xl capitalize text-center text-black bg-slate-300 p-1 px-5 rounded-xl bg-opacity-50  sm:text-xl'>With one click  . .  choose what you need </h1>
                <h1 className='text-bold text-2xl capitalize text-center text-black bg-slate-300 p-1 rounded-xl bg-opacity-50 sm:text-xl'>you will receive your order immediately </h1>
                <button className='btn '>let begain</button>
        </div>

        <div className="electronic my-24 md:container sm:mx-5 ">
          <p>Electronic items</p>
            <Splide options={{ gap:'.5rem' ,
      perPage: 3,
      // pagination:false ,
      arrows:false , }} >
                {itemsElec ?  itemsElec.map(item =>{
                  return(
                    <>
                    <SplideSlide key={item._id} onClick={()=> navigate(`/product/${item._id}`) } className=' relative  cursor-pointer h-56 '>
                      <img  className='rounded-md h-full w-full absolute inset-0  ' src={item.prImg} alt="" />
                      <p className='absolute overflow-hidden md:text-xl sm:text-sm text-center justify-center items-center md:inset-x-10 sm:inset-x-2   h-fit bottom-8 hover:scale-105  transition-all bg-gray-300 bg-opacity-75'>{item.prName}</p>
                    </SplideSlide>
                    </>
                  )
                })
              
              :
              
              ''
              
              }
            </Splide>
        </div>


        <div className="electronic my-24 md:container sm:mx-5 ">
          <p>Toys items</p>
            <Splide options={{ gap:'.5rem' ,
      perPage: 3,
      // pagination:false ,
      arrows:false , }} >
                {itemsToy ?  itemsToy.map(item =>{
                  return(
                    <>
                    <SplideSlide key={item._id} onClick={()=> navigate(`/product/${item._id}`) } className=' relative  cursor-pointer h-56 '>
                      <img  className='rounded-md h-full w-full absolute inset-0  ' src={item.prImg} alt="" />
                      <p className='absolute overflow-hidden md:text-xl sm:text-sm text-center justify-center items-center md:inset-x-10 sm:inset-x-2   h-fit bottom-8 hover:scale-105  transition-all bg-gray-300 bg-opacity-75'>{item.prName}</p>
                    </SplideSlide>
                    </>
                  )
                })
              
              :
              
              ''
              
              }
            </Splide>
        </div>

        

        <div className="electronic my-24 md:container sm:mx-5 ">
          <p>Toys items</p>
            <Splide options={{ gap:'.5rem' ,
      perPage: 3,
      // pagination:false ,
      arrows:false , }} >
                {itemsFash ?  itemsFash.map(item =>{
                  return(
                    <>
                    <SplideSlide key={item._id} onClick={()=> navigate(`/product/${item._id}`) } className=' relative  cursor-pointer h-56 '>
                      <img  className='rounded-md h-full w-full absolute inset-0  ' src={item.prImg} alt="" />
                      <p className='absolute overflow-hidden md:text-xl sm:text-sm text-center justify-center items-center md:inset-x-10 sm:inset-x-2   h-fit bottom-8 hover:scale-105  transition-all bg-gray-300 bg-opacity-75'>{item.prName}</p>
                    </SplideSlide>
                    </>
                  )
                })
              
              :
              
              ''
              
              }
            </Splide>
        </div>
    </div>
  )
}

export default Home