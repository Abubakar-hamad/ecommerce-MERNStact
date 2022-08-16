import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate , Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner/Spinner'
import { registerUser, reset } from '../Redux/slices/userSlice'

const Register = () => {
  const {user   , isLoading , isError , isSuccess  , message} = useSelector(state => state.auth)
  const [formData , setFormDate] = useState({
    name:'' , email:''  , password :'' , password2:''
  })
  const {name , email ,password  ,password2} = formData
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleChange =(e)=>{
    setFormDate({...formData , [e.target.name]:e.target.value})
  }
  useEffect(()=>{
    if(isError){
      toast.error(message)
    }
   
    dispatch(reset())

  },[isError , dispatch , message ])
 
  if(isSuccess || user){
    navigate('/login')
    toast.success('account created Successfully')
  }

  const handleSubmit = (e)=>{
    e.preventDefault()

    if(password !== password2){
      toast.error('Password Does Not Match')
     

    } else{
      const userData={
        name , email , password
      }
      dispatch(registerUser(userData))
    }
  }
  return (
    <div className='container'>
      <h1 className='text-4xl my-10 bg-slate-400 p-4 rounded-lg '>Register Form</h1>
        <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-8 my-10' action="">
          <input onChange={handleChange} type="text" name="name" placeholder='Enter Name' className='form-input' />
          <input onChange={handleChange} type="text" name="email" placeholder='Enter Email' className='form-input' />
          <input onChange={handleChange} type="text" name="password" placeholder='Enter Password' className='form-input' />
          <input onChange={handleChange} type="text" name="password2" placeholder='Enter Password Again' className='form-input' />
          <input onChange={handleChange} type="submit" value='confirm' className='btn-primary' />
   
        <p className='capitalize text-sm'>already have an acount ? <Link to={'/login'} className="underline text-blue-600 " >login</Link></p>
        </form>
        <>
        {isLoading ?
        <Spinner/>
        :''  
      }
        </>
    </div>
  )
}

export default Register