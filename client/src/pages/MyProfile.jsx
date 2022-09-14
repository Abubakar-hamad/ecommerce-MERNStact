import React, { useState } from 'react'
import UseFetch from '../hooks/useFetch'
import {AiFillEdit} from 'react-icons/ai'
import {FaSave} from 'react-icons/fa'
const MyProfile = () => {
    const {data  , isLoading , isError} = UseFetch('user/me')
    const [edit , setEdit] = useState(false)
  return (
   
   <div  className='text-center grid justify-center items-center text-4xl mt-60 '>
        {edit ?
        
        <div className='flex gap-5 justify-center items-center'>
          <div className="basis-1/2 bg-red-500">
            <img src={data?.img} alt="img" />
          </div>
          <div className="basis-3/4 grid gap-5 justify-center items-center">
           <div className="flex justify-between items-center gap-3">
            <label htmlFor="name"> Name</label>
            <input type="text" id='name' placeholder={data.name}  />
           </div>

           <div className="flex justify-between items-center gap-3">
            <label htmlFor="email"> Email</label>
            <input type="text" id='email' value={data.email}  />
           </div>

           <div className="flex justify-between items-center gap-3">
            <label htmlFor="createdAt">Created</label>
            <input type="text" id='createdAt' value={data.createdAt}  />
           </div>
          </div>
        </div>
        
      :
      
      <div className='flex gap-5 justify-center items-center text-gray-500'>
          <div className="basis-1/2 bg-red-500">
            <img src={data?.img} alt="img" />
          </div>
          <div className="basis-3/4 grid gap-5 justify-center items-center">
           <div className="flex justify-between items-center gap-3">
            <label htmlFor="name"> Name</label>
            <input type="text" id='name' value={data.name}  />
           </div>

           <div className="flex justify-between items-center gap-3">
            <label htmlFor="email"> Email</label>
            <input type="text" id='email' value={data.email}  />
           </div>

           <div className="flex justify-between items-center gap-3">
            <label htmlFor="createdAt">Created</label>
            <input type="text" id='createdAt' value={data.createdAt}  />
           </div>
          </div>
        </div>
        }
        <div className="flex justify-end items-center mt-4">
          {edit ? 
          <FaSave className='text-green-500 hover:scale-125 transition-all cursor-pointer' onClick={()=> setEdit(false)} />
          :

          <AiFillEdit className='text-blue-500 hover:scale-125 transition-all cursor-pointer' onClick={()=> setEdit(true)} />
        }
            
        </div>

     
    </div>
  )
}

export default MyProfile