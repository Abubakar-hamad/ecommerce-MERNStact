import React, { useState } from 'react'
import UseFetch from '../hooks/useFetch'
import { AiFillDelete , AiOutlineCloseCircle } from 'react-icons/ai'
import axios from 'axios'
import { toast } from 'react-toastify'
const Users = () => {
    const user = UseFetch('/user/')
    const users = user.data


    const [confirm  , setConfirm] = useState(false)
    const [disable , setDisable] = useState(true)
    const [userSelect  , setUserSelect] = useState('')
    console.log(userSelect);
    const handleDel = (id)=>{
        setConfirm(true)
        const user = users.find(users => users._id == id)
        setUserSelect(user)
    } 
    const handleChange = (e)=>{
        if (e.target.value === userSelect?.email) {
             document.getElementById('btn').classList.remove('disable')
             setDisable(false)
        }else{
            document.getElementById('btn').classList.add('disable')
            setDisable(true)
        }
    }
    console.log(disable);
    
    const deleteItem = async(id)=>{
        
        if(!disable || disable == false){
            await axios.delete(`/user/${id}`)    
            window.location.reload(false)
            toast.success('User deleted Successfully')
        }else{
        toast.error('Confirm First ')
        }
      }
      
   
    return (

        <div className='relative'>   
    <>
        
    <div className='container my-10'>
        {users ?
        <>
        <div className='container relative'>
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
            <div  key={item._id} className='relative border-b border-slate-300 p-5 hover:bg-slate-300 hover:rounded-md hover:transition-all   md:container cursor-pointer sm:grid md:flex  items-center justify-between '>
             
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
            <AiFillDelete  className=' absolute text-red-700 top-5 right-0 hover:scale-125 hover:transition-all   ' onClick={()=>handleDel(item._id)} />
            </div>
          )
        })} 
        
        
        {confirm && 
             <div className="fixed bg-black bg-opacity-25 inset-0 z-10 justify-center  items-center flex ">
                
                <form className='grid bg-gray-300 gap-5 p-5 rounded-lg'>
                    <div className='flex justify-between items-center '>
                        <p className='text-red-700 font-bold'>Are you absolutely sure?</p>
                        <AiOutlineCloseCircle className='hover:scale-150 transition-all font-bold cursor-pointer' onClick={()=>setConfirm(x => !x)} />
                    </div>

                    <p>Please type <b className='text-blue-700 '>{userSelect?.email}</b> to confirm .</p>
                    <input onChange={handleChange} className='form-input' type="text" name="" id="" />
                    <button id='btn'  onClick={disable ? (e)=>e.preventDefault() : ()=>deleteItem(userSelect?._id)} className='btn-primary disable' > I understand the consequences to delete this user</button>
                </form>
                
            </div>
        }
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