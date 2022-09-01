import React from 'react'
import { toast } from 'react-toastify'
import UseFetch from '../hooks/useFetch'
import {AiFillDelete , AiOutlineEdit} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner/Spinner'
import { useDispatch } from 'react-redux'
import { deleteProducts } from '../Redux/slices/productSlice'




const MyProduct = () => {
  const dispatch = useDispatch()  
  
  const {data  ,  isLoading   , isError ,   } = UseFetch('/prod/Myproduct')
  
    const navigate =useNavigate()
    
      if(isError){
          toast.error(isError.response.data)
      }

  
    return (
    <div className='container my-10'>
        {data ? <> { data.map((item) =>{
          return (
            <div key={item._id} className='border-b p-5 hover:bg-amber-100 hover:transition-all cursor-pointer flex items-center justify-between '>
            <img  onClick={()=>{navigate(`/product/${item._id}`)}} className='w-10 rounded-full' src={item.prImg} alt="img" />
            <p  onClick={()=>{navigate(`/product/${item._id}`)}} >{item.prName}</p>
           <AiOutlineEdit className='hover:scale-125 text-green-700 hover:transition-all' />
            <AiFillDelete onClick={()=>{dispatch(deleteProducts(item._id)) ; window.location.reload(false)}} className='hover:scale-125 text-red-700 hover:transition-all'/>
            </div>
          )
        })} 
        </>
        :
        <>
        {isLoading ? <Spinner /> : 'No Item to Show ..' }
        </>
        }
    </div>
  )
}

export default MyProduct