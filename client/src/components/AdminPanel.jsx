import React, { useRef, useState , useEffect} from 'react'
import {useNavigate } from 'react-router-dom'
import {FaComments , FaUsers , FaWindowClose} from 'react-icons/fa'
import {BiMessageAltAdd} from 'react-icons/bi'
import {MdProductionQuantityLimits} from 'react-icons/md'
import UseFetch from '../hooks/useFetch'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner/Spinner'
import { reset ,createProduct } from '../Redux/slices/productSlice'



const AdminPanel = ({profileUser}) => {
   const [addNew  ,setAddNew] = useState(false)
    const countUsers  = UseFetch('/user/uuu')
    const countComment  = UseFetch('/comment/ccc')
    const countProduct  = UseFetch('/prod/ppp')
    const dispatch  = useDispatch()
    const navigate = useNavigate()
    const openUsers = ()=>{
        navigate('/adminPanel/users')
    }
    const openComments = ()=>{
        navigate('/adminPanel/comments')
    }
    const openItems = ()=>{
        navigate('/adminPanel/items')
    }

    const addnewItems =()=>{
        setAddNew(true)
    }

    const {isLoading   , isError} = useSelector(state => state.products )
    const imageRef = useRef()
    const [image  , setImage] = useState('')
    const [formData ,  setFormData] = useState({
        prName:'' , prQuant:'' , prPrice:'' , prDesc:'' , prImg:'' , prCategory:''
    }) 
  
    const {prName , prCategory  , prDesc  , prPrice  , prQuant} = formData
   
    const handleChange = (e)=>{
        e.preventDefault() 
        setFormData({
            ...formData ,[e.target.name]:e.target.value
        })
   }

    const handleSubmit =(e)=>{
        e.preventDefault()
        if(!prName || !prPrice || !prDesc || !prCategory  ){
            toast.error('some Fildes is require')    
        }
        formData.prImg = image
        dispatch(createProduct(formData))
        toast.success('product success added')
        setFormData({ prName:'' , prQuant:'' , prPrice:'' , prDesc:'' , prImg:'' , prCategory:''})
        setImage('')
        setAddNew(false)
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
    <>
   
    <div className='flex sm:grid justify-center my-10 gap-2 px-3 sm:container'>
        <div className="bg-blue-200 sm:p-5 sm:my:5 rounded-xl  items-center  md:hidden sm:flex  justify-around sm:gap-4  ">   
            <p>Admin panel</p>
        </div>
   
            <div className="md:grid md:grid-cols-3  p-5 sm:grid justify-center items-center my-5 gap-5 capitalize  scroll  overflow-y-scroll sm:h-96 ">
                <div onClick={openUsers} className='shadow-blue-400 shadow-md rounded-xl hover:scale-105 transition-all cursor-pointer   gap-5 p-5 w-48 flex flex-col  justify-center items-center'>
                    <FaUsers className='text-6xl '/>
                    <p className='text-2xl text-center'>users</p>
                    <p className='text-center font-bold'>{countUsers.data.count || 0}</p>
                </div>

                <div onClick={openItems} className='shadow-blue-400 shadow-md rounded-xl hover:scale-105 transition-all cursor-pointer  gap-5 p-5 w-48 flex flex-col  justify-center items-center'>
                    <MdProductionQuantityLimits className='text-6xl' />
                    <p className='text-2xl text-center'>items</p>
                    <p className='text-center font-bold'>{countProduct.data.count || 0}</p>
                </div>


                <div onClick={openComments} className='shadow-blue-400 shadow-md rounded-xl hover:scale-105 transition-all cursor-pointer  gap-5 p-5 w-48 flex flex-col justify-center items-center'>
                    <FaComments className='text-6xl' />
                    <p className='text-2xl text-center'>comments</p>
                    <p className='text-center font-bold'>{countComment.data?.count || 0}</p>
                </div>

                <div onClick={addnewItems} className='shadow-blue-400 shadow-md rounded-xl hover:scale-105 transition-all cursor-pointer   gap-5 p-5 w-48 flex flex-col  justify-center items-center'>
                    <BiMessageAltAdd className='text-6xl '/>
                    <p className='text-2xl text-center'>new </p>
                    <p className='text-center font-bold'>add new product</p>
                </div>
            </div>

    </div>


        {addNew && 
        <div className=''>
            <div className="fixed bg-black bg-opacity-90 inset-0 z-10 ">
            <FaWindowClose className=' absolute top-5 right-5 text-3xl text-gray-400 cursor-pointer hover:scale-125 transition-all' onClick={()=> setAddNew((x)=>!x) }/>
                <div className='md:container my-10  '>
            {profileUser.isAdmin &&
            <div className="form capitalize ">
            <form className='flex items-center justify-around my-5 shadow-md p-5 text-white font-bold bg-black bg-opacity-75 rounded-lg' action="">
            
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
                    <option className='text-black ' value="toys">toys</option>
                    <option className='text-black ' value="electronic">electronic</option>
                    <option className='text-black ' value="fashion">fashion</option>
                </select>
                <input  ref={imageRef} onChange={handleImg} type="file" name='prImg' />
                <button onClick={handleSubmit} className='btn mt-4' >add</button>
            </div>


            </form>
        </div>
            }
                </div>
            </div>
        </div>
        }
  </>
  )
}

export default AdminPanel