import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner/Spinner'
import UseFetch from  '../hooks/useFetch'
import {AiOutlineEdit , AiFillDelete} from 'react-icons/ai'
import {BsFillArrowDownCircleFill  , BsFillArrowUpCircleFill } from 'react-icons/bs'
import {FaWindowClose} from 'react-icons/fa'
import { toast } from 'react-toastify'


import {FaCcPaypal  , FaCcVisa , FaCcAmazonPay } from 'react-icons/fa'




const Cart = () => {

  const navigate = useNavigate()
  let [payment , setPayment]  = useState(false)
  let data = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
  
  // const qunt = data.map(items =>items.Qunt) 
  // const sumQuant =  qunt?.reduce((acc , i )=>{
  //   return acc + i
  // })
 


  const increse = (p)=>{
    const item = data.find( i => i._id === p._id  )
    let itemLocation = data.indexOf(item);
    data[itemLocation].Qunt += 1;
    localStorage.setItem("cart" , JSON.stringify(data))
    window.top.location = window.top.location
  }

  const decrease = (p)=>{
    
    const item = data.find( i => i._id === p._id  )
    let itemLocation = data.indexOf(item);
    data[itemLocation].Qunt -= 1;
    data[itemLocation].Qunt == "0" && data.splice(itemLocation, 1) ;
    localStorage.setItem("cart" , JSON.stringify(data))
    window.top.location = window.top.location
  }
  console.log(payment);
  const deleteItem = (p)=>{
    const item = data.find( i => i._id === p._id  )
    let itemLocation = data.indexOf(item);
    data.splice (itemLocation , 1) 
    localStorage.setItem("cart" , JSON.stringify(data))
    window.top.location = window.top.location
  }

  const mount =  data.map(items=> items.prPrice * items.Qunt)
  const sumMount = mount?.length > 0 && mount.reduce((a , i )=> a + i) 
  const quant  = data.map(items => items.Qunt)
  const sumQuant = ()=>{
    if(data != ''){
      let sum = quant.reduce((x , y)=> x + y)
      return sum
    }else{
      return 0 ;
    }
  }
  const tax = parseInt(sumMount * 0.06 )
  
  return (
    <div className='relative'>   
    <>
        
    <div className='container my-10'>
        {data ?
        <>
        <div>
        { data.map((item) =>{
          return (
            <div  key={item._id} className='border-b border-slate-300 p-5 hover:bg-slate-300 hover:rounded-md hover:transition-all  md:container cursor-pointer flex gap-5 items-center justify-between '>
            <img  onClick={()=>{navigate(`/product/${item._id}`)}} className=' w-10  rounded-full ' src={item.prImg} alt="img" />
            <p  onClick={()=>{navigate(`/product/${item._id}`)}} className="text-center w-12 text-md" >{item.prName}</p>
           <p  onClick={()=>{navigate(`/product/${item._id}`)}} className="text-left w-12 text-sm" >{item.prPrice}$</p>
          <p className="text-left w-12 text-sm" >{item.Qunt * item.prPrice} $</p>
           <div className='flex flex-col  justify-center items-center  gap-1 basis-1/4 '>
              <BsFillArrowUpCircleFill onClick={()=>increse(item)} />
              <p >{item.Qunt}</p>
              <BsFillArrowDownCircleFill onClick={()=>decrease(item)} />
           </div>
           <AiFillDelete onClick={()=>deleteItem(item)} className='hover:scale-125 text-red-600 hover:transition-all' />
            {/* <AiFillDelete onClick={()=>{dispatch(deleteProducts(item._id)) ; window.location.reload(false)}} className='hover:scale-125 text-red-700 hover:transition-all'/> */}
            </div>
          )
        })} 
        </div>
        <div className="flex items-center justify-center">
        {data != '' &&  <button onClick={()=>setPayment((x)=>!x)} className='btn-auth w-full  my-5'>Payment</button>}
        </div>

        </>
        :
       ''
        }
        
    </div>
    
   {
    payment && data &&
    <div className="div fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-10">
    
          <FaWindowClose className='absolute top-28 text-3xl text-gray-400 cursor-pointer hover:text-black hover:rounded-2xl hover:scale-125 transition-all' onClick={()=> setPayment((x)=>!x) }/>
          <div className="bg-white p-10 rounded-lg  ">
          <table class="table-fixed w-80  ">
      <thead className='bg-slate-200 '>
      <tr>
        <th>Itme </th>
        <th>Quantity</th>
        <th>Price</th>
      </tr>
      </thead>
      <tbody className='text-center' >

        {data && data.map(item =>{
          return(
          <tr className='border-b-slate-300 text-md border-2' >
            <td >{item.prName}</td>
            <td>{item.Qunt}</td>
            <td>{item.prPrice * item.Qunt}$</td>
          </tr>

          )
        })}
      </tbody>
      <hr />
      <br />
      <tfoot className='text-center bg-black bg-opacity-25'>
      <tr>
        <td><b></b> total </td>
        <td>{sumQuant()}</td>
        <td><b>{sumMount} $</b></td>
      </tr>
      </tfoot>
      </table>
        <div className='grid gap-3 my-5 bg-slate-200 p-3 rounded-lg' >
        <div className="flex gap-5">
          <b className='underline' >tax 6%</b>
          =
          <b >{tax} $</b>
        </div>
        <div className="flex gap-5">
          <p className='underline'>total price with tax</p>
          =
          <b >{tax + sumMount} $</b>
        </div>
      
        </div>
          <div className="flex mx-auto gap-5 items-center justify-center w-60 text-4xl">
          <FaCcPaypal className=' hover:scale-110 transition-all w-full cursor-pointer text-amber-900' />  
          <FaCcVisa className='hover:scale-110 transition-all w-full cursor-pointer text-blue-500'/>  
          <FaCcAmazonPay className='hover:scale-110 transition-all w-full cursor-pointer text-yellow-600'/> 
          </div>
          </div>
    </div>
   }

  
    
    </>
    </div>
  )
}

export default Cart