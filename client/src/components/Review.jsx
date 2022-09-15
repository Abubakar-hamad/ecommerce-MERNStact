import React , {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

import { toast } from 'react-toastify'
import { getComments  , reset  } from '../Redux/slices/reviewSlice'
import axios from 'axios'

const Review = () => {
    const param = useParams()
    const id = param.id
    const dispatch = useDispatch()
    const {comments , isLoading , isSuccess  , isError , message} = useSelector(state => state.review)
    const [formData , setFormData] = useState({text:''})
    const {text}= formData



    useEffect(()=>{
    
        dispatch(getComments(id))
        dispatch(reset())
    } , [dispatch , isError , isLoading , message])
    
    
    const handleChange = (e)=>{
        setFormData({ ...formData , [e.target.name]:e.target.value})
    }
    const updatePage = ()=>{
        dispatch(getComments(id))
    }
    const fetchComment = async(formData)=>{
        try {
            const res = await axios.post(`/comment/${id}` , formData)
            return res.status
        } catch (error) {
            toast.error(error)
        }
    }
    const handleClick = (e)=>{
        e.preventDefault()
        if(!text){
            return toast.error('')
        }
        
        fetchComment(formData)
        setFormData({text:''})
        updatePage()
    }

    return (
    <div className={comments ? 'container mt-10 grid md:gap-2  shadow-xl shadow-black/10 border-t-4 p-2 border-blue-500  ' : 'flex justify-center items-center'}>
        <p className='bg-blue-200 text-center font-bold my-5'>Review</p>
       <div className="addRev container grid  basis-1/4">

        <form action="post" className='grid w-60 mx-auto gap-4'>
        <textarea name="text" type="text" value={text}  onChange={handleChange}  cols="30" rows="10"></textarea>
        <input onClick={handleClick} type="submit" className='btn-primary' />
        </form>
        
        </div>
       
        <div className=" scroll overflow-y-auto overflow-x-hidden h-72 p-10   ">

              {comments  ? 
              
              comments.map(comment =>{
                return(
                    <div key={comment._id} className="comment text-sm   mb-5 border-b-2 border-gray-400 py-3">
                    <div className="heder flex justify-around items-center bg-slate-300 rounded-md p-2">
                        <img className='w-10 h-10 rounded-full' src={comment.userImg} alt="img" />
                        <div className="userNameAndReview grid items-center ">
                            <p>{comment.userName}</p>
                  
                        </div>
                        <div className="time hidden md:block">
                            {comment.createdAt}
                        </div>
                    </div>
                    <div className="desc justify-center">
                           {comment.text}
                    </div>
                    </div>
                )
              })
              
              :
    
              <h3 className='bg-slate-400'>no comment on this product</h3>
            
              }        

        </div>



      
    </div>
  )
}

export default Review