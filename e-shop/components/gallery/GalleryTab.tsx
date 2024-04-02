import { cn } from '@/libs/utils'
import { Image as ImageType } from '@/types'
import { Tab } from '@headlessui/react'
import Image  from 'next/image'
import React from 'react'

interface galleryTabProps{
    image:ImageType
}
const GalleryTab:React.FC<galleryTabProps> = ({image}) => {
  return (
    <Tab className="relative flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white">
        {({selected})=>(
            <div>
                <span className={
                    cn(
                        "absolute h-full w-full aspect-square overflow-hidden inset-0 rounded-md bg-gray-200 border",
                        selected ?"border-slate-500":""
                    )
                }>
                    <Image fill src={image.url} alt='image' className="object-center object-contain" />
                </span>
                <span className={cn(
                    "absolute inset-0 rounded-md right-2",
                    selected ?"border-slate-600":"ring-transparent"
                )}></span>
            </div>
        )}
    </Tab>
  )
}

export default GalleryTab
