"use client";

import React from 'react'
import { Tab } from '@headlessui/react'
import { Image as ImageType } from '@/types';
import GalleryTab from './GalleryTab';
import Image from 'next/image';

interface galleryProps{
    images:ImageType[]
}


const Gallery:React.FC<galleryProps> = ({images=[]}) => {
  return (
    <Tab.Group as="div" className="flex flex-col-reverse">
        <div className='mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none'>
            <Tab.List className="grid grid-cols-4 gap-8">
                {
                    images.map((img)=>(
                        <GalleryTab key={img.id} image={img}/>
                    ))
                }
            </Tab.List>
        </div>
        <Tab.Panels className="aspect-square w-full">
            
            {
                images.map((img)=>(
                    <Tab.Panel key={img.id}>
                        <div className="aspect-square bg-gray-100 rounded-xl relative h-full w-full sm:rounded-lg overflow-hidden">
                            <Image src={img.url} alt='image' className='object-cover object-center' fill/>
                        </div>
                    </Tab.Panel>
                ))
            }
        </Tab.Panels>
    </Tab.Group>
  )
}

export default Gallery
