import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner/Spinner'
import { reset ,createProduct } from '../Redux/slices/productSlice'
import {FaWindowClose} from 'react-icons/fa'
import axios from 'axios'
import FileBase64 from 'react-file-base64';


const AddProduct = () => {
    const dispatch  = useDispatch()
    const {product  , isLoading , isSuccess  , isError} = useSelector(state => state.products )
    const imageRef = useRef()
    const [formData ,  setFormData] = useState({
        prName:'' , prQuant:'' , prPrice:'' , prDesc:'' , prImg:'' , prCategory:''
    }) 
   
    const {prName , prCategory  , prDesc , prImg , prPrice  , prQuant} = formData
   
    const handleChange = (e)=>{
        e.preventDefault() 
        setFormData({
            ...formData , [e.target.name]:e.target.value
        })
      
    
   }
  
    const handleClick =(e)=>{
        e.preventDefault()
        if(!prName || !prPrice || !prDesc || !prCategory ){
            toast.error('some Fildes is require')    
        }
        
        dispatch(createProduct(formData))
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
    <div className='container my-10 '>
        <div className="form capitalize ">
            <h3 className='bg-gradient-to-l from-slate-300 to-orange-100 p-5 rounded-lg'>Create Products</h3>
            <form className='flex items-center justify-around my-5 shadow-md p-5' action="">
               

                <div onClick={()=>{imageRef.current.click()}} className=" relative bg-gradient-to-l from-slate-200 to-slate-50 p-5 border-black/25 border rounded-xl w-80 h-80 flex justify-center items-center lowercase cursor-pointer ">
                        <div>          
                            
  
           
         
                <h3 className='opacity-25'>select Image</h3>
    
                            <input  hidden ref={imageRef} onChange={handleChange} type="file" name='prImg' />
                            <FileBase64 multiple={ false } onDone={handleChange} />
                            {/* <FaWindowClose className='absolute hover:scale-110 hover:text-gray-700' /> */}
                        </div>
                 
                
            
            
             
     
                </div>

                <div className="grid items-center justify-center gap-5">
               <input onChange={handleChange} className='form-input' type="text" placeholder='Title' name='prName' />
                <input onChange={handleChange} className='form-input' type="number" placeholder='Quntity' name='prQuant' />
                <input onChange={handleChange} className='form-input' type="number" placeholder='Price' name='prPrice' />
                <textarea onChange={handleChange} className='form-input' type="text" placeholder='Description' name='prDesc' />
                <select onChange={handleChange} className='form-input' name="prCategory" id="">
                    <option hidden value="Category">category</option>
                    <option value="toys">toys</option>
                    <option value="electronic">electronic</option>
                    <option value="fashion">fashion</option>
                </select>
                <button onClick={handleClick} className='btn-primary' >add</button>
               </div>


            </form>
        </div>
    </div>
  )
}

export default AddProduct