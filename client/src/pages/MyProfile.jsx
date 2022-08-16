import React from 'react'
import UseFetch from '../hooks/useFetch'

const MyProfile = () => {
    const {data  , isLoading , isError} = UseFetch('user/me')
   console.log( data);
  return (
   
   <div  className='text-center text-4xl mt-60'>
        {data.name}
    </div>
  )
}

export default MyProfile