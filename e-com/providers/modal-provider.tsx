"use client"

import StoreModal from '@/components/modals/Store-modal'
import React, { useEffect, useState } from 'react'

const ModalProvider = () => {
    const [isMounted,setIsMounted]=useState(false);

    useEffect(()=>{
        setIsMounted(true)
    },[])
  return (
    <StoreModal/>
  )
}

export default ModalProvider
