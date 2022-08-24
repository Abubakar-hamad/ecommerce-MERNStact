import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { reset , getProducts } from '../Redux/slices/productSlice'
import img from '../img.jpg'
import Search from './Search'
import Spinner from './Spinner/Spinner'

const Products = () => {
    const dispatch = useDispatch()

    const {items, isLoading , isError  , message  , isSuccess}  =  useSelector(state => state.products)  
    const navigate = useNavigate()
    useEffect(()=>{
        dispatch(getProducts())
        return ()=>{
            dispatch(reset())
        }
    },[dispatch ])
    
    
    if(isError){
        toast.error(message)
    }
    if(isLoading){
        console.log('loading');
    }

   


    return (

    <div className="container gap-4 flex h-full my-10 ">

    <div className=" basis-5/6 mt-2 h-80   rounded-md p-2 "> 
        <Search />
       </div>
    
    <div className='  grid grid-cols-4 gap-2  basis-6/7 h-96 scroll overflow-y-scroll  '>
       { items ? items.map((item) =>{
        return(
            <div onClick={()=>navigate(`/product/${item._id}`)} className='border grid grid-row-2 md:my-2 shadow-md shadow-slate-400 cursor-pointer rounded-md ' key={item._id}>
              
                <div className='relative  overflow-hidden ' >
                    <img className=' hover:scale-105 w-full hover:transition-all' src={img} alt="" />
                    <p style={{'fontSize':'10px' , 'padding':'2px' , 'backgroundColor':item.prCategory === 'toys' && 'yellowgreen' || item.prCategory === 'electronic' && 'skyblue' || item.prCategory === 'fashion' && 'pink'  }} className=' text-gray-700 inline  rounded-md text-sm absolute right-2 top-5'>{item.prCategory}</p>
                    </div>
                    <div className="content">
                    <p className='text-2xl text-gray-700 font-bold text-center capitalize'>{item.prName}</p>
                    <hr />
                    {/* <p className='text-sm  bg-gray-200 bg-opacity-75 text-center' >{item.prDesc}</p> */}
                    </div> 

                </div>                   
        )
       })
        : 
       <Spinner/>
       } 

    </div>

      
    </div>
  )
}

export default Products