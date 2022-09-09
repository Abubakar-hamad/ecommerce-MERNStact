import React from 'react'
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

const Contact = () => {

   

    const handleSubmit =(e)=>{
        e.preventDefault()
        const btn = document.getElementById('sendBtn')
        btn.style.display = 'none'
        emailjs.sendForm(
                process.env.REACT_APP_SERVICE_ID,
                process.env.REACT_APP_TEMPLATE_ID,
                e.target,
                process.env.REACT_APP_PUBLIC_ID
        ) .then((result) => {
            toast.success('message sent successfully')
            setTimeout(()=>{
                window.location.reload(false)
            } , 3000)
        }, (error) => {
            console.log('something went wrong' , error.text);
        })
        

    }


    return (
    <div className='my-12 md:container sm:mx-5 capitalize'>
        <p className='border-blue-500 border-b-4 text-center  font-bold text-2xl my-5   '>contact Me</p>
        <form onSubmit={handleSubmit} action="" className='  shadow-lg shadow-black/50 p-5 grid justify-center rounded-b-xl items-center md:gap-8 sm:gap-5'>
            <input type="text" className='form-input' name="name" id="" placeholder='Enter Your Name' />
            <input type="email" className='form-input' name="user_email" id="" placeholder='Enter Your Email' />
            <textarea type="text"  name="message" className='form-input' id="" placeholder='Message' />
            <input type="submit" id='sendBtn' className='btn-primary' value='send' />
        </form>
    </div>
  )
}

export default Contact