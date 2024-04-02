"use client";
import { Product } from '@/types'
import Image from 'next/image';
import React, { MouseEventHandler } from 'react'
import IconBtn from './IconBtn';
import { Expand, ShoppingCart } from 'lucide-react';
import Currency from './Currency';
import { useRouter } from 'next/navigation';
import usePreviewModal from '@/hooks/usePreview';
import useCart from '@/hooks/useCart';

interface ProductCardProps {
    data: Product
}
const ProductCard:React.FC<ProductCardProps> = ({data}) => {
    const previewModal=usePreviewModal()
    const router=useRouter()
    const cart = useCart()

    const handelClick=()=>{
        router.push(`/product/${data?.id}`)
    }

    const onPreview:MouseEventHandler<HTMLButtonElement>=(e)=>{
      e.stopPropagation();

      previewModal.onOpen(data)


    }

    const onAddToCart:MouseEventHandler<HTMLButtonElement>=(e)=>{
      e.stopPropagation();

      cart.addItem(data)
    }
    
  return (
    <div onClick={handelClick} className="bg-white group cursor-pointer rounded-xl border p-3 space-y-3">
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image src={data?.images?.[0].url} fill alt='image' className="aspect-square object-cover rounded-md"/>
        <div className="opacity-0 group-hover:opacity-100 transition absolute bottom-5 w-full px-6">
            <div className='flex gap-x-6 justify-center'>
                <IconBtn icon={<Expand size={20} className='text-gray-600'/>} onClick={onPreview}/>
                <IconBtn icon={<ShoppingCart size={20} className='text-gray-600'/>} onClick={onAddToCart}/>
            </div>

        </div>
      </div>
      <div>
        <p className="font-semibold text-lg">{data.name}</p>
        <p className="text-sm text-gray-500">{data.category?.name}</p>
      </div>
      <div className='flex items-center justify-between'>
       <Currency value={data?.price}/> 
      </div>
    </div>
  )
}

export default ProductCard
