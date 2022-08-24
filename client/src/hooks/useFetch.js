import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"

const UseFetch = (url) => {
  const [data , setData] = useState('') 
  const [isLoading , setIsLoading] = useState(false)
  const [isError , setIsError] = useState(false)


  useEffect(()=>{
    const fetchData = async()=>{
        setIsLoading(true)
        try {
            const res = await axios.get(url)
            console.log(res.data)
            setData(res.data)
        } catch (error) {
            setIsError(error)
            console.log(error)
        }
        setIsLoading(false)
    }
    fetchData()


  } ,[url])

  const reFetchData = async()=>{
    setIsLoading(true)
    try {
        const res = await axios.get(url)
        setData(res.data)
    } catch (error) {
        setIsError(error)
        console.log(error);
    }

    setIsLoading(false)
  }
  return {data  , isLoading , isError , reFetchData}
}


export default UseFetch