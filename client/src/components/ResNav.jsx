import React from 'react'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiOutlineClose} from 'react-icons/ai'
import { NavLink  } from 'react-router-dom'

const ResNav = ({ profileUser , showNav , active}) => {
  return (
    <div className='block'>
        {active ?
        <div className='grid justify-center relative '>
           <div className="absolute">
           <AiOutlineClose className='text-4xl cursor-pointer absolute -top-5 -left-3 '  onClick={showNav}/>
           
          

          <div style={{height:'90vh'}} className="absolute  -left-20 top-10 w-60   grid justify-center backdrop-blur-md bg-slate-100 bg-opacity-25 capitalize  rounded-md border-2 border-black/25 items-center  p-8 font-bold">
          <NavLink onClick={showNav} className='link hover:ml-1' to='/' >home</NavLink>
          <NavLink onClick={showNav} className='link hover:ml-1' to='/products' >items</NavLink>
          {!profileUser.isAdmin && <>
          <NavLink onClick={showNav} className='link hover:ml-1' to={'/new'}>Add Product</NavLink>
          <NavLink onClick={showNav} className='link hover:ml-1' to={'/saved'}>saved Product</NavLink>
          <NavLink onClick={showNav} className='link hover:ml-1' to={'/myproducts'}>My Product</NavLink>
          </>
          }
          <NavLink onClick={showNav} className='link hover:ml-1' to={'/contact'}>contact</NavLink>
          </div>
          
                
          </div>

         
            
      
        </div> 
        :
        <GiHamburgerMenu onClick={showNav} className='text-4xl cursor-pointer' /> }
    </div>
  )
}


export default ResNav