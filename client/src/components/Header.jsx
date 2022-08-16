import React from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import UseFetch from '../hooks/useFetch'
import {AiOutlineMail , AiOutlineTwitter , AiOutlineInstagram} from 'react-icons/ai'
import {BsTelephone , BsFacebook} from 'react-icons/bs'
import {IoIosArrowDown} from 'react-icons/io'
import { FiUser , FiUserPlus , FiLogOut} from 'react-icons/fi'
import icon from   '../icon.png'
import userPrpfiel from   '../userProfile.png'
import { useState } from 'react'





const Header = () => {
    const navigate = useNavigate()
    const date =  Date();
    const profile = JSON.parse(localStorage.getItem('u-p'))
    const [model  , setModel] = useState(false)
    const logout = async()=>{
        localStorage.removeItem('u-p')
        try {
            const res  = await axios.get('/auth/logout')
            return res
        } catch (error) {
            console.log(error);
        }
       navigate('/login')
    }

    const mouseHover =()=>{
        setModel(x=> !x)
        console.log(model);
    }

    const activeClick = (e)=>{
        e.currentTarget.classList.toggle('active')
 
    }

    
  return (
    <>
      <div  className='h-7 text-sm bg-slate-200 grid grid-cols-2 items-center justify-around px-2'>
        <div className=""><p style={{'fontSize':'10px'}}>{date}</p></div>
        <div className="grid grid-cols-3  ">
            <div className="flex items-center ">
                
                <span><BsTelephone/></span>
                <span>+249922838007</span>
            </div>
            
            <div className="flex items-center ">
                <span><AiOutlineMail/></span>
                <span>abubakar.hmdelneel@gmail.com</span>
            </div>
            

            {/* <div className="flex items-center ">
            <span className='text-blue-600 cursor-pointer ' ><BsFacebook/></span>
            <span className='text-pink-500 text-xl cursor-pointer' ><AiOutlineInstagram/></span>
            <span className='text-blue-700 text-xl cursor-pointer'><AiOutlineTwitter/></span>
            </div> */}


           
        </div>
        </div>

    <div className='flex justify-between items-center h-20 p-5 z-10 bg-slate-300 text-gray-800 sticky top-0 '>
        <div onClick={()=> navigate('/')}   className="cursor-pointer text-blue w-40 text-2xl  ">
          <img className='w-full' src={icon} alt="" />
        </div>
        <nav  >
            <ul className='flex gap-3' id='count'>
                <Link onClick={activeClick} className='link active' to='/' >home</Link>
                <Link onClick={activeClick} className='link' to='/products' >items</Link>
                <Link onClick={activeClick} className='link' to={'/'}>about</Link>
                <Link onClick={activeClick} className='link' to={'/'}>contact</Link>
                <div className='realative' onClick={mouseHover}  to='/' >
                    <span className='flex items-center  cursor-pointer link' > navigate <IoIosArrowDown className='text-sm' /></span>
                   {model ?
                     <div  onMouseLeave={()=>setModel(false)}  className="dropdown">
                     <Link className='border-b-2 border-b-solid border-b-gray-400 opacity-75 hover:opacity-100 hover:ml-2 hover:transition-all' to={'/'}>My Product</Link>
                     <Link className='border-b-2 border-b-solid border-b-gray-400 opacity-75 hover:opacity-100 hover:ml-2 hover:transition-all' to={'/'}>saved Product</Link>
                     <Link className='border-b-2 border-b-solid border-b-gray-400 opacity-75 hover:opacity-100 hover:ml-2 hover:transition-all' to={'/'}>create Product</Link>
                    </div>
                    :
                    ''   
                    }
                </div>
            </ul>
        </nav>


        <div className='flex gap-2 '>
        {profile ?
        <div className='flex gap-8'>
        
        <div  className="flex items-center gap-1 text-sm link ">
                <img className='w-5 rounded-full border-solid border-gray-400 border-2' src={userPrpfiel} alt="" />
                <Link  to='/profile' > {profile ? profile : ""}</Link>
        </div>
        <div className="flex items-center gap-1 ">
        <Link className='text-red-700 hover:text-xl hover:transition-all w-8' title='logout' onClick={logout}  to='/' ><FiLogOut/></Link>
        </div>
        
        </div>
        :
        <>
        <div className="flex items-center gap-1 btn-auth">
                <span><FiUser/></span>
                <Link to='/login' >login</Link>
        </div>
        
        <div className="flex items-center gap-1 btn-auth">
                <span><FiUserPlus/></span>
                <Link to='/register' >register</Link>
        </div>
        
        </>    
    }
        </div>
        </div>
        </>
  )
}

export default Header