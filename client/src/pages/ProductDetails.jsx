import React from 'react'
import { useParams } from 'react-router-dom'
import UseFetch from '../hooks/useFetch'
import Spinner from '../components/Spinner/Spinner'
import {BsFillArrowDownCircleFill  , BsFillArrowUpCircleFill } from 'react-icons/bs'
import {AiOutlineStar , AiFillStar ,AiOutlineShoppingCart  , AiOutlineHeart} from 'react-icons/ai'
import Review from '../components/Review'
import {toast} from 'react-toastify'



const ProductDetails = () => {
    const param  = useParams()

    const {data ,isLoading  , isError , messgae}  = UseFetch(`/prod/${param.id}/`)
    
    const item = data.product
    const btn = document.getElementById('cart')
    
    
    var cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []

    
    
    
    const ToCart=(item)=>{
    
    
    let isItemInCart = cart && cart.find( items => items._id === item._id)
    
    if(isItemInCart){
      return toast.info('item allready added');
      }
      if(!isItemInCart){
      item.Qunt = 1
      localStorage.setItem("cart" , JSON.stringify( [...cart , item]))
      toast.success('item added success');
      window.top.location = window.top.location
    }
    }
    

  {/* 
    <div className="flex items-center text-yellow-500  ">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
          
        </div> 
*/}
    
    return (

    <div className='my-10' >
       {item ? 
       
      <div className='container' >

        <div className="md:flex sm:grid sm:container items-center justify-center md:gap-32">

        <div className="md:basis-1/4 sm:basis-1/2 relative ">
          <img src={item.prImg} className='w-full' alt='img' />
          <div className="btns flex items-center gap-2">
          <AiOutlineHeart className='text-red-400 text-2xl cursor-pointer absolute top-5 right-5 hover:scale-125 transition-all'/>
        </div>
        </div>

        <div className="grid gap-5 capitalize">
              <div className="flex gap-2 items-center ">
              <b>Name : </b>  <p className='md:text-6xl sm:text-3xl text-green-700  font-bold'>{item.prName}</p>
              </div>
              <button id='cart' onClick={()=>{ToCart(item)}} className='bttn w-full border-gray-400 border-2 flex justify-center items-center capitalize gap-2 '>add to cart <AiOutlineShoppingCart/></button>

              <div className="flex gap-2 text-sm items-center">
                  <b>category :</b> <p >{item.prCategory}</p>
              </div>
              <div className="flex gap-2 text-sm items-center ">
                <b>price : </b> <p className='text-2xl text-green-700 font-bold'>{item.prPrice} SDG </p>  
              </div>
              <div className="flex gap-2 text-sm items-center "> 
                <b>quantity :  </b> 
                <div className="flex gap-2 text-2xl items-center justify-center">
                <b className=''>{item.prQuant}</b> 
                <div className="grid gap-2 text-green-700">
                  <BsFillArrowUpCircleFill className='cursor-pointer hover:scale-110 transition-all' />
                  <BsFillArrowDownCircleFill className='cursor-pointer hover:scale-110 transition-all' />
                </div>
                </div>
              </div>
                 
                <hr className='bg-green-800 h-1' />
                <div className="grid text-xl gap-1">
                <b className='text-green-700 font-bold' >Description</b>
                <p>{item.prDesc}</p>
              </div>
        </div>

        </div>
         
       
        <Review className="mt-5" item={item} />
      </div>
      
    :
    <Spinner/>} 

    </div>
  )
}

export default ProductDetails