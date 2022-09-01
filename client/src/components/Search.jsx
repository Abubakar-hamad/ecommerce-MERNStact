import React from 'react'
import UseFetch from '../hooks/useFetch'

const Search = ({setType}) => {
  

  // const {data } = UseFetch('/prod/category')

  const handleClick = (e)=>{
   const val =  e.target.innerText
   {setType(val.toLowerCase())}
   
  }
  const handleClear = ()=>{
    setType('')
  }
  return (
    <div className=' shadow-xl shadow-black/25 md:h-60 sm:w-96 md:w-36 sm:flex sm:justify-center md:grid md:grid-cols-1 sm:py-5   gap-3 md:p-5 bg-gradient-to-t from-slate-300 rounded-md capitalize ' >
     
          <p onClick={handleClear} className='hover:pl-1 h-fit cursor-pointer rounded-md p-0.5 bg-amber-500 transition-all'>All items  </p>
          
          <p onClick={handleClick} className='hover:pl-1 h-fit cursor-pointer rounded-md p-0.5 bg-sky-300   transition-all'>electronic</p>
          
          <p onClick={handleClick} className='hover:pl-1 h-fit cursor-pointer rounded-md p-0.5 bg-green-500 transition-all'>toys  </p>

          <p onClick={handleClick} className='hover:pl-1 h-fit cursor-pointer rounded-md p-0.5 bg-pink-400  transition-all'>fashion   </p>
       

          
       


    </div>
  )
}

export default Search