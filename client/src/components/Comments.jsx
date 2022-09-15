import React from 'react'
import UseFetch from '../hooks/useFetch'
import {AiFillDelete , AiOutlineCloseCircle} from 'react-icons/ai'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
const Comments = () => {
  
    const comment = UseFetch('/comment')
    const comments = comment.data
    const [confirm  , setConfirm] = useState(false)
    const [disable , setDisable] = useState(true)
    const [userSelect  , setUserSelect] = useState('')
    const handleDel = (id)=>{
        setConfirm(true)
        const user = comments.find(users => users._id == id)
        setUserSelect(user)
    } 
    const handleChange = (e)=>{
        if (e.target.value === userSelect?.userName) {
             document.getElementById('btn').classList.remove('disable')
             setDisable(false)
        }else{
            document.getElementById('btn').classList.add('disable')
            setDisable(true)
        }
    }
    
    const deleteItem = async(id )=>{
        if(!disable || disable == false){
            await axios.delete(`/comment/${id}`)    
            window.location.reload()
            toast.success('User deleted Successfully')
        }else{
        toast.error('Confirm First ')
        }
      }

    return (
    
    <div className='relative'>   
    <>
        
    <div className='container my-10'>
        {comments ?
        <>
        <div className='container'>
        <div  className='border-b hidden border-slate-300 p-5 bg-slate-400 font-bold capitalize md:container cursor-pointer md:flex items-center justify-between '>
        <div className='basis-1/4 flex gap-4'>
            <p></p>
            <p>Product_ID</p>
        </div>
        <div className='basis-1/4'>
            <p>User Email</p>
        </div>
        <div className='basis-1/4'>
            <p>Comment</p>
        </div>
        <div className='basis-1/4'>
            <p>ID</p>
        </div>
           
              
        </div>
        { comments.map((item , i ) =>{
          return (
            <div  key={item._id} className='relative border-b border-slate-300 p-5 hover:bg-slate-300 hover:rounded-md hover:transition-all   md:container cursor-pointer sm:grid md:flex  items-center justify-between '>
           <AiFillDelete  className=' absolute text-red-700 top-5 right-0 hover:scale-125 hover:transition-all   ' onClick={()=>handleDel(item._id)} />

            <div className='basis-1/4 md:flex sm:grid  md:gap-10 items-center justify-items-start text-right'>
            <p className='sm:font-bold' >{i + 1} </p>
           <div className='flex gap-4' >
            <b className='md:hidden inline ' >PRODUCT_ID</b>
           <p>{item.productId}</p>
           </div>
            </div>
            <div className='basis-1/4'>
            <div className='flex gap-4' >
            <b className='md:hidden inline ' >Email</b>
            <p>{item.userEmail}</p>
           </div>
            
            </div>
            <div className='basis-1/4'>
            <div className='flex gap-4' >
            <b className='md:hidden inline ' >TEXT</b>
            <p>{item.text}</p>
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

    {confirm && 
             <div className="fixed bg-black bg-opacity-25 inset-0 z-10 justify-center  items-center flex ">
                
                <form className='grid bg-gray-300 gap-5 p-5 rounded-lg'>
                    <div className='flex justify-between items-center '>
                        <p className='text-red-700 font-bold'>Are you absolutely sure?</p>
                        <AiOutlineCloseCircle className='hover:scale-150 transition-all font-bold cursor-pointer' onClick={()=>setConfirm(x => !x)} />
                    </div>

                    <p>Please type <b className='text-blue-700 '>{userSelect?.userName}</b> to confirm .</p>
                    <input onChange={handleChange} className='form-input' type="text" name="" id="" />
                    <button id='btn'  onClick={disable ? (e)=>e.preventDefault() : ()=>deleteItem(userSelect?._id)} className='btn-primary disable' > I understand the consequences  , delete this comment</button>
                </form>
                
            </div>
        }
        </div>
       

        </>
        :
       'there is No Comment'
        }
        
    </div>
    
    
    </>
    </div>
  )
}

export default Comments