import React from 'react'
import { useState } from 'react'
import {BsFacebook , BsLinkedin , BsGithub , BsWhatsapp}  from 'react-icons/bs'
import {ImTwitter} from 'react-icons/im'
import { BsFillArrowUpCircleFill } from 'react-icons/bs'
const Footer = () => {
const toTop = ()=>{

}
  return (
    <footer className='p-4 bg-blue-700 text-white sm:p-6 mt-24 '>
        <div className="container">
          <p className='text-center font-bold text-2xl uppercase'>get connected with us on social network</p>
          <br />
          <hr />
          <br />
          </div>
          <div className="bg-slate-300 md:flex sm:grid sm:justify-center md:justify-between md:px-10 sm:text-center items-center rounded-lg text-black">
            <div className="grid justify-center items-center text-2xl gap-3">
            <p className='uppercase'> follow me in </p>
            <div className="flex justify-center items-center gap-5">
            <BsFacebook/>
          <BsGithub/>
          <BsLinkedin/>
          <BsWhatsapp />  
            </div>
            </div>
          <div className="grid justify-end bg items-center md:border-l-2 border-gray-500 p-5">
            <p className='font-bold text-center mb-2 uppercase'>tools used</p>
            <div className="grid grid-cols-2 justify-center items-center gap-10">
              <p className=''>MongoDB</p>
              <p className=''>Express</p>
              <p className=''>ReactJS</p>
              <p className=''>NodeJs</p>
            </div>
          </div>
        </div>
          <div className='text-center flex justify-center items-center gap-4 cursor-pointer my-3'>
            <p className='font-bold text-2xl uppercase'>back to top</p>
            <BsFillArrowUpCircleFill className='text-2xl'/>
          </div>
          <br />
          <hr />
          <br />
          <div onClick={toTop} className=' flex justify-between items-center h-1 text-sm'>
          <span>&copy;2022 All rights reserved</span> 
          <span>created by Abubakar Hmd</span>
          </div>
    </footer>
    
 
  )
}

export default Footer