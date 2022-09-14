import React, { useEffect } from 'react'
import UseFetch from '../hooks/useFetch'
import {AiFillDelete} from 'react-icons/ai'
import axios from 'axios'





const Items = ({items , setItems}) => {
    
  const deleteItem = async(id)=>{
    const itemToDel = items.filter(items => items._id !== id)
    setItems(itemToDel)
    await axios.delete(`/prod/${id}`)    
  }
  
 

    return (

    <div className='relative'>   
    <>
        
    <div className='container my-10'>
        {items ?
        <>
        <div className='container'>
        <div  className='border-b hidden border-slate-300 p-5 bg-slate-400 font-bold capitalize md:container cursor-pointer md:flex items-center justify-between '>
        <div className='basis-1/4 flex gap-4'>
            <p></p>
            <p>PRODUCT</p>
        </div>
        <div className='basis-1/4'>
            <p>CATEGORY</p>
        </div>
        <div className='basis-1/4'>
            <p>PRICE</p>
        </div>
        <div className='basis-1/4'>
            <p>ID</p>
        </div>
           
              
        </div>
        { items.map((item  ,i ) =>{
          return (
            <div key={item._id} className='border-b relative border-slate-300 p-5 hover:bg-slate-300 hover:rounded-md hover:transition-all   md:container cursor-pointer sm:grid md:flex  items-center justify-between '>
           <AiFillDelete className='absolute text-red-700 top-5 right-5 hover:scale-125' onClick={()=>deleteItem(item._id)} />
            <div className='basis-1/4 md:flex sm:grid  md:gap-10 items-center justify-items-start text-right'>
            <p className='sm:font-bold' >{i + 1} </p>
           <div className='flex gap-4' >
            <b className='md:hidden inline ' >Name</b>
           <p>{item.prName}</p>
           </div>
            </div>
            <div className='basis-1/4'>
            <div className='flex gap-4' >
            <b className='md:hidden inline ' >Categoty</b>
            <p>{item.prCategory}</p>
           </div>
            
            </div>
            <div className='basis-1/4'>
            <div className='flex gap-4' >
            <b className='md:hidden inline ' >Price</b>
            <p>{item.prPrice}</p>
           </div>
            
            </div>
            <div className='basis-1/4'>
            <div className='flex gap-4' >
            <b className='md:hidden inline ' >ID</b>
            <p>{item._id}</p>
           </div>
            
            </div>
          
            </div>
          )
        })} 
        </div>
       

        </>
        :
       ' '
        }
        
    </div>
    
    
    </>
    </div>
  )
}

export default Items