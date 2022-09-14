import React from 'react'
import UseFetch from '../hooks/useFetch'

const Users = () => {
    const user = UseFetch('/user/')
    const users = user.data

   
    return (

        <div className='relative'>   
    <>
        
    <div className='container my-10'>
        {users ?
        <>
        <div className='container'>
        <div  className='border-b hidden border-slate-300 p-5 bg-slate-400 font-bold capitalize md:container cursor-pointer md:flex items-center justify-between '>
        <div className='basis-1/4 flex gap-4'>
            <p></p>
            <p>NAME</p>
        </div>
        <div className='basis-1/4'>
            <p>isAdmin</p>
        </div>
        <div className='basis-1/4'>
            <p>EMAIL</p>
        </div>
        <div className='basis-1/4'>
            <p>ID</p>
        </div>
           
              
        </div>
        { users.map((item  , i) =>{
          return (
            <div  key={item._id} className='border-b border-slate-300 p-5 hover:bg-slate-300 hover:rounded-md hover:transition-all   md:container cursor-pointer sm:grid md:flex  items-center justify-between '>
           
            <div className='basis-1/4 md:flex sm:grid  md:gap-10 items-center justify-items-start text-right'>
            <p className='sm:font-bold' >{i + 1} </p>
           <div className='flex gap-4' >
            <b className='md:hidden inline ' >name</b>
           <p>{item.name}</p>
           </div>
            </div>
            <div className='basis-1/4'>
            <div className='flex gap-4' >
            <b className='md:hidden inline ' >Admin</b>
            <p>{item.isAdmin ? 'admin' : 'x'}</p>
           </div>
            
            </div>
            <div className='basis-1/4'>
            <div className='flex gap-4' >
            <b className='md:hidden inline ' >Email</b>
            <p>{item.email}</p>
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
       'There is No Users Right Now'
        }
        
    </div>
    
    
    </>
    </div>
  )
}

export default Users