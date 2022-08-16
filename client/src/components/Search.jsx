import React from 'react'

const Search = () => {
  return (
    <div className='shadow-xl shadow-black/25 grid gap-3 p-3 bg-gradient-to-t from-slate-300 rounded-md capitalize ' >
            <p >search option</p>
        <div className="">
        <select  className=' bg-slate-300 rounded-md p-1 w-full' name="category" id="">
            <option hidden value="category">category</option>
            <option value="">electronic</option>
            <option value="">toys</option>
            <option value="">fashion</option>
        </select>
        </div>
        <hr />
        <p>Price Range</p>
        <div className="flex  items-center justify-between gap-2">
         <span>min</span> <input type="text" className='bg-slate-100 border-2 border-gray-400  rounded-md  w-24'/>
        </div>

        <div className="flex  items-center justify-between gap-2">
         <span>max</span> <input type="text" className='bg-slate-100 border-2 border-gray-400  rounded-md w-24'/>
        </div>

        <input type="submit" className='btn-auth' value='get' />
    </div>
  )
}

export default Search