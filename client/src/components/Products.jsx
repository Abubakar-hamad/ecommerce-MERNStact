import  React , { useState , useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Search from './Search'
import Spinner from './Spinner/Spinner'
import UseFetch from '../hooks/useFetch'
import ReactPaginate from 'react-paginate';





const Products = ({items}) => {

    const [type , setType] = useState('')
    
    const navigate = useNavigate()
    const {data  , isLoading , isError} =  UseFetch(type ? `/prod/filter?prCategory=${type}` : `/prod/` ) 
  
    
    if(isError){
        toast.error(isError.message)
    }

    useEffect(()=>{
        
    } , [])
 

    return (

    <div className="container  md:flex md-flex-col-2 h-full md:my-10 sm:gap-4  sm:grid sm:justify-center sm:items-center ">

    <div className=" md:basis-1/6 md:mt-2 s md:h-90 rounded-md"> 
        <Search setType={setType} />
       </div>
    
    <div className='   md:basis-6/7  grid md:grid-cols-3 sm:grid-cols-2 gap-4 sm:h-96  md:h-90 scroll overflow-y-scroll  '>
       { data ? data.products.map((item) =>{
        return(
            <div onClick={()=>navigate(`/product/${item._id}`)} className='border grid grid-row-2 md:my-2 h-60 p-4 bg-white  shadow-md shadow-slate-400 cursor-pointer rounded-md ' key={item._id}>
              
                <div className='relative  overflow-hidden ' >
                    <img className=' hover:scale-105 w-full h-48 hover:transition-all' src={item.prImg} alt="img" />
                    <p style={{'fontSize':'10px' , 'padding':'2px' , 'backgroundColor':item.prCategory === 'toys' && 'yellowgreen' || item.prCategory === 'electronic' && 'skyblue' || item.prCategory === 'fashion' && 'pink'  }} className=' text-gray-700 inline  rounded-md text-sm absolute right-2 top-5'>{item.prCategory}</p>
                    </div>
                    <div className="content">
                    <p className='text-2xl text-gray-700 font-bold text-center capitalize'>{item.prName}</p>
           
                    {/* <p className='text-sm  bg-gray-200 bg-opacity-75 text-center' >{item.prDesc}</p> */}
                    </div> 

                </div>                   
        )
       })

       
        : 
    
       <Spinner />


       }
        
    </div>
        {/* <>
    

      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        // onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        // pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
        </> */}

    
    </div>
  )
}

export default Products