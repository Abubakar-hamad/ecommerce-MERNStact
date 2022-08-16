import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate  , Link} from 'react-router-dom'
import { reset , loginUser } from '../Redux/slices/userSlice'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner/Spinner'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user , isSuccess , isLoading , isError , message}  = useSelector(state => state.auth)
  const [formData ,setFormData] = useState({
    email:'' , password:'' 
  })
  const profile = JSON.parse(localStorage.getItem("u-p"))
  if(profile){
    navigate('/')
  }
  const {email  , password} = formData
  const handleChange = (e)=>{
    setFormData({
      ...formData , [e.target.name]:e.target.value
    })
  }
  if(isLoading){
    <Spinner/>
  }

  useEffect(()=>{
    if(isError){
      toast.error(message)
    }
    if(isSuccess){
      navigate('/')
      toast.success('login success')
      
    }
    dispatch(reset())
  },[dispatch , message , navigate , isSuccess , isError])

  const handleSubmit = (e)=> {  
    e.preventDefault()
    console.log('login');
    if(!email || !password ){
      toast.error('all fields require')
    }
    dispatch(loginUser(formData))
    
  }


  return (
    <div className='container'>
     <h1 className='text-4xl my-10 bg-slate-400 p-4  rounded-lg '>Login Form</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8 my-10 shadow-lg mx-52 p-10 ' action="">
          <input onChange={handleChange} type="text" name="email" placeholder='Enter Email' className='form-input' />
          <input onChange={handleChange} type="text" name="password" placeholder='Enter Password' className='form-input' />
          <input onChange={handleChange} type="submit" value='Login' className='btn-primary' />
  
        <p className='capitalize text-sm'>Don't have an acount ? <Link to={'/register'} className="underline text-blue-600 " >login</Link></p>
        </form>
    </div>


)}

export default Login