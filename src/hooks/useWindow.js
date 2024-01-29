import  { useState } from 'react'
import { useEffect } from 'react'

export default function useWindow(){
    
    const[windowSize,setWindowSize]=useState([window.innerWidth,window.innerHeight])

    useEffect(() => {
      
        const handleSize=()=>{
            setWindowSize([window.innerWidth,window.innerHeight])
        }


        window.addEventListener("resize",handleSize)
    
      return () => {
        window.removeEventListener("resize",handleSize)
      }
    }, [])

    return windowSize
    
}

