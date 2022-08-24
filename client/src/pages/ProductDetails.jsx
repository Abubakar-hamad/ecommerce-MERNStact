import React from 'react'
import { useParams } from 'react-router-dom'
import UseFetch from '../hooks/useFetch'
import Spinner from '../components/Spinner/Spinner'
import img from '../img.jpg'
import {AiOutlineStar , AiFillStar ,AiOutlineShoppingCart  , AiOutlineHeart} from 'react-icons/ai'
import Review from '../components/Review'
import { addToCart , getCart, reset } from '../Redux/slices/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import {toast} from 'react-toastify'

const ProductDetails = () => {
    const param  = useParams()

  
    const dispatch = useDispatch()
    const {data ,isLoading  , isError , messgae}  = UseFetch(`/prod/${param.id}/`)
    const {cart , product } = useSelector(state => state.products)
    const item = data.product
    const btn = document.getElementById('cart')
    
   

    useEffect(()=>{
      dispatch(getCart())
      if(isError){
      toast.error(messgae)
      }
    
    },[dispatch])

    const ToCart = (id)=>{
      dispatch(addToCart(id))
      if(product !== ''){
        toast.success(product)
      }
    }
    
    return (

    <div>
       {item ? 
       
      <div className='' >
       <div className="flex items-center justify-center my-12 container  shadow-xl shadow-black/10">
     
    <div className="basis-1/2 grid gap-4 ">
      <div className="flex gap-4 items-center ">
      <div className="left">
      <div className="flex items-center text-yellow-500  ">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
          <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">4.95 out of 5</p>
        </div> 
        <div className="det text-sm capitalize">
              <div className="flex text-2xl  font-bold">
                  <p>{item.prName}</p>
              </div>
              <div className="flex gap-4 text-sm">
                  <span>category <b>{item.prCategory}</b> </span>
              </div>
              <div className="flex gap-10 items-center  ">
                <span>price <b>{item.prPrice}</b> SDG  </span>
              </div>
              <div className="flex gap-4"> 
                <span>quantity <b>{item.prQuant}</b> </span>
              </div>
        </div>
     
      </div>
        <div className="btns flex items-center gap-2">
        <button id='cart' onClick={()=>{ToCart(item._id)}} className='btn-auth flex justify-center items-center gap-2 '>add to cart <AiOutlineShoppingCart/></button>
        <AiOutlineHeart className='text-red-400 text-2xl cursor-pointer'/>
      </div>
      </div>

     
        <hr />
        <div className="">
        <p>Description</p>
        <p>{item.prDesc}</p>
       </div>
        </div>
          
        <div className="basis-1/3 ">
          <img src={img} className='w-full' alt='img' />
        </div>
       </div>
       
       <Review item={item} />
       
      </div>
      
    :
    <Spinner/>} 

    </div>
  )
}

export default ProductDetails