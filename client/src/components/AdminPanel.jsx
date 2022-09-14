import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {FaComments , FaUsers , FaWindowClose} from 'react-icons/fa'
import {BiMessageAltAdd} from 'react-icons/bi'
import {MdProductionQuantityLimits} from 'react-icons/md'
import UseFetch from '../hooks/useFetch'
import { useState } from 'react'
import Users from './Users'


const AdminPanel = () => {
   
    const countUsers  = UseFetch('/user/uuu')
    const countComment  = UseFetch('/comment/ccc')
    const countProduct  = UseFetch('/prod/ppp')
    const navigaet = useNavigate()
    const openUsers = ()=>{
        navigaet('/adminPanel/users')
    }
    const openComments = ()=>{
        navigaet('/adminPanel/comments')
    }
    const openItems = ()=>{
        navigaet('/adminPanel/items')
    }

    const addnewItems =()=>{
        navigaet('/new')
    }
    
  return (
    <>
   
    <div className='flex sm:grid justify-center my-10 gap-2  px-3 sm:container'>
        <div className="bg-blue-200 sm:p-5 sm:my:5 rounded-xl  items-center  md:hidden sm:flex  justify-around sm:gap-4  ">   
            <p>Admin panel</p>
        </div>
   
            <div className="md:grid md:grid-cols-3  sm:grid justify-center items-center my-5 gap-5 capitalize  scroll  overflow-y-scroll sm:h-96 ">
                <div onClick={openUsers} className='shadow-blue-400 shadow-md rounded-xl hover:scale-105 transition-all cursor-pointer   gap-5 p-5 w-48 flex flex-col  justify-center items-center'>
                    <FaUsers className='text-6xl '/>
                    <p className='text-2xl text-center'>users</p>
                    <p className='text-center font-bold'>{countUsers.data.count}</p>
                </div>

                <div onClick={openItems} className='shadow-blue-400 shadow-md rounded-xl hover:scale-105 transition-all cursor-pointer  gap-5 p-5 w-48 flex flex-col  justify-center items-center'>
                    <MdProductionQuantityLimits className='text-6xl' />
                    <p className='text-2xl text-center'>items</p>
                    <p className='text-center font-bold'>{countProduct.data.count}</p>
                </div>


                <div onClick={openComments} className='shadow-blue-400 shadow-md rounded-xl hover:scale-105 transition-all cursor-pointer  gap-5 p-5 w-48 flex flex-col justify-center items-center'>
                    <FaComments className='text-6xl' />
                    <p className='text-2xl text-center'>comments</p>
                    <p className='text-center font-bold'>{countComment.data.count}</p>
                </div>

                <div onClick={addnewItems} className='shadow-blue-400 shadow-md rounded-xl hover:scale-105 transition-all cursor-pointer   gap-5 p-5 w-48 flex flex-col  justify-center items-center'>
                    <BiMessageAltAdd className='text-6xl '/>
                    <p className='text-2xl text-center'>new </p>
                    <p className='text-center font-bold'>add new product</p>
                </div>
            </div>

    </div>

  </>
  )
}

export default AdminPanel