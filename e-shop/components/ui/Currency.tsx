"use Client"
import { formatter } from '@/libs/utils'
import React, { useEffect, useState } from 'react'

interface currencyProps{
    value?:string | number
}
const Currency:React.FC<currencyProps> = ({value}) => {
    const [isMounted,setIsMounted]=useState(false)
    useEffect(()=>{
        setIsMounted(true)
    },[])

    if (!isMounted) {
        return null
    }
    
  return (
    <div className="font-semibold">
      {formatter.format(Number(value))}
    </div>
  )
}

export default Currency
