import React from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner/Spinner'
import UseFetch from  '../hooks/useFetch'
const Cart = () => {
  const {data  ,isLoading   , isErrro} = UseFetch('/prod/cart')
  const navigate = useNavigate()

  return (
        

        
        <div className='container my-10'>
        {data ? <> { data.map((item) =>{
          return (
            <div key={item._id} className='border-b p-5 hover:bg-amber-100 hover:transition-all cursor-pointer flex items-center justify-between '>
            <img  onClick={()=>{navigate(`/product/${item._id}`)}} className='w-10 rounded-full' src="" alt="img" />
            <p  onClick={()=>{navigate(`/product/${item._id}`)}} >{item.prName}</p>
           {/* <AiOutlineEdit className='hover:scale-125 text-green-700 hover:transition-all' /> */}
            {/* <AiFillDelete onClick={()=>{dispatch(deleteProducts(item._id)) ; window.location.reload(false)}} className='hover:scale-125 text-red-700 hover:transition-all'/> */}
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

export default Cart