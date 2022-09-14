import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner/Spinner'
import { reset ,createProduct } from '../Redux/slices/productSlice'
import {FaWindowClose} from 'react-icons/fa'
import axios from 'axios'
import FileBase64 from 'react-file-base64';
import { useNavigate } from 'react-router-dom'


const AddProduct = ({profileUser}) => {
    const dispatch  = useDispatch()
    const navigate  = useNavigate()
    const {product  , isLoading , isSuccess  , isError} = useSelector(state => state.products )
    const imageRef = useRef()
    const [image  , setImage] = useState('')
    const [formData ,  setFormData] = useState({
        prName:'' , prQuant:'' , prPrice:'' , prDesc:'' , prImg:'' , prCategory:''
    }) 
  
    const {prName , prCategory  , prDesc , prImg , prPrice  , prQuant} = formData
   
    const handleChange = (e)=>{
        e.preventDefault() 
        setFormData({
            ...formData ,[e.target.name]:e.target.value
        })
   }

    const handleSubmit =(e)=>{
        e.preventDefault()
        if(!prName || !prPrice || !prDesc || !prCategory ){
            toast.error('some Fildes is require')    
        }
        formData.prImg = image
        dispatch(createProduct(formData))
        toast.success('product success added')
        setFormData({ prName:'' , prQuant:'' , prPrice:'' , prDesc:'' , prImg:'' , prCategory:''})
        setImage('')
    }

    const setFileToBase = (file)=>{
        const reader =new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = (e)=>{
            console.log(reader);
    
            setImage(reader.result)
        }
   
    }

    const handleImg = (e)=>{
        const file = e.target.files[0]
        setFileToBase(file)
        console.log(file);
    }

    useEffect(()=>{
        if(isError){
            toast.error(isError.response.data)
        }

        dispatch(reset())


    },[reset , isError  , dispatch])

    if(isLoading){
        <Spinner />
    }
  
  return (
    <div className='md:container my-10 '>
        {profileUser.isAdmin &&
        <div className="form capitalize ">
        <h3 className='bg-gradient-to-l from-slate-300 to-orange-100 p-5 rounded-lg'>Create Products</h3>
        <form className='flex items-center justify-around my-5 shadow-md p-5' action="">
           
           {image &&  
            <div className=" w-48 border p-5">
            <div className="relative">
            <FaWindowClose onClick={()=>setImage('')} className='absolute top-50 left-50 cursor-pointer hover:scale-110' />
            <img src={image} alt="img"  />
            </div>

          </div>
            }

            <div className="grid items-center justify-center gap-5">
           <input onChange={handleChange} className='form-input' value={prName} type="text" placeholder='Title' name='prName' />
            <input onChange={handleChange} className='form-input' value={prQuant} type="number" placeholder='Quntity' name='prQuant' />
            <input onChange={handleChange} className='form-input' value={prPrice} type="number" placeholder='Price' name='prPrice' />
            <textarea onChange={handleChange} className='form-input' value={prDesc} type="text" placeholder='Description' name='prDesc' />
            <select onChange={handleChange} className='form-input' value={prCategory} name="prCategory" id="">
                <option hidden value="Category">category</option>
                <option value="toys">toys</option>
                <option value="electronic">electronic</option>
                <option value="fashion">fashion</option>
            </select>
            <input  ref={imageRef} onChange={handleImg} type="file" name='prImg' />
            <button onClick={handleSubmit} className='btn-primary' >add</button>
           </div>


        </form>
    </div>
        }
    </div>
  )
}

export default AddProduct