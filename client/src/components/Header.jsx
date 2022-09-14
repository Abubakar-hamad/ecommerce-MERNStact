import React from 'react'
import axios from 'axios'
import { NavLink  ,Link ,useNavigate } from 'react-router-dom'
import UseFetch from '../hooks/useFetch'
import {AiOutlineMail , AiOutlineTwitter , AiOutlineInstagram} from 'react-icons/ai'
import {BsTelephone , BsFacebook , BsCart4} from 'react-icons/bs'
import {IoIosArrowDown} from 'react-icons/io'
import { FiUser , FiUserPlus , FiLogOut} from 'react-icons/fi'
import icon from   '../img/icon.png'
import userPrpfiel from   '../userProfile.png'
import { useState } from 'react'
import ResNav from './ResNav'

import {FaSolarPanel} from 'react-icons/fa'


const Header = ({profileUser}) => {

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
    const adminP = ()=>{

    }
    const mouseHover =()=>{
        setModel(x=> !x)
    }

    const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
    const [active  , setActive] = useState(false)
    
    const showNav = ()=>{
        setActive(x=>!x)
    }

 
  return (
    <>
  
      <div  className='h-7 text-sm bg-slate-200 md:grid md:grid-cols-2 items-center  justify-around px-2 hidden'>
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



           
        </div>
        </div>

    <div className='flex justify-around items-center h-20 p-5 z-10 shadow-md shadow-gray-500 bg-slate-300 text-gray-800 sticky top-0 '>
        <div className="md:hidden sm:block">
        <ResNav setActive={setActive} active={active} showNav={showNav} />
    
        </div>
        <div onClick={()=> navigate('/')}   className="cursor-pointer text-blue w-32 h-12  md:flex justify-center items-center hidden   ">
         
          <img src={icon} alt="" />
            
        
        </div>

            {profileUser.isAdmin && 
            <NavLink to='/adminPanel'><FaSolarPanel className='fixed z-10 cursor-pointer text-6xl bg-blue-700 text-white p-2 rounded-full bottom-5 right-10 hover:scale-125 transition-all' onClick={adminP} /></NavLink>
            }
            {!profileUser.isAdmin &&
            <nav className='hidden md:block'  >
            <ul className='flex gap-3 ' id='count'>
                <NavLink className='link ' to='/' >home</NavLink>
                <NavLink className='link ' to='/products' >items</NavLink>
                <div className='realative' onClick={mouseHover}  to='/' >
                    <span className='flex items-center  cursor-pointer link' > navigate <IoIosArrowDown className='text-sm' /></span>
                   {model ?
                     <div  onMouseLeave={()=>setModel(false)}  className="dropdown">
                     {profileUser.isAdmin && <NavLink className='border-b-2 border-b-solid border-b-gray-400 opacity-75 hover:opacity-100 hover:ml-2 hover:transition-all' to={`/new`}>Add Product</NavLink>}
                     <NavLink className='border-b-2 border-b-solid border-b-gray-400 opacity-75 hover:opacity-100 hover:ml-2 hover:transition-all' to={'/'}>saved Product</NavLink>
                     <NavLink className='border-b-2 border-b-solid border-b-gray-400 opacity-75 hover:opacity-100 hover:ml-2 hover:transition-all' to={'/myproducts'}>My Product</NavLink>
                    </div>
                    :
                    ''   
                }

                </div>
                <NavLink  className='link' to={'/contact'}>contact</NavLink>
                <NavLink className='relative' to={'/cart'}>
                    <BsCart4 className='text-2xl mx-3'/> 
                    {cart  &&
 
                    <span className='absolute -top-3 -right-1 bg-rose-900 text-white text-sm w-5 h-5  text-center rounded-full '>{cart.length}</span>
                    }
                </NavLink>
            </ul>
            </nav>
            }
        


        <div className='flex gap-4 justify-center items-center '>
        {profile ?
        <div className='flex gap-4'>
            <Link className='relative ml-5 md:hidden sm:block' to={'/cart'}>
            <BsCart4 className='text-2xl mx-3'/> 
            {cart  &&
 
            <span className='absolute -top-3 -right-1 bg-rose-900 text-white text-sm w-5 h-5  text-center rounded-full '>{cart.length}</span>
            }
        </Link>
        <div  className="flex items-center gap-1 text-sm link ">
                <img className='w-5 rounded-full border-solid border-gray-400 border-2' src={userPrpfiel} alt="" />
                <NavLink  to='/profile' > {profile ? profile : ""}</NavLink>
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