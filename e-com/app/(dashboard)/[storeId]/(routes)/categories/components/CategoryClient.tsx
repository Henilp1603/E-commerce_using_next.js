"use client";
import React from 'react'
import { CategoryColumn, columns } from './Columns';
import { useParams, useRouter } from 'next/navigation';
import Heading from '@/components/ui/Heading';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-tabel';
import ApiList from '@/components/Api-list';



interface categoryclientProps{
  data:CategoryColumn[]
}



const CategoryClient:React.FC<categoryclientProps> = ({data}) => {
    const router = useRouter()
    const params = useParams()

    
  return (
    <>
    <div className='flex items-center justify-between'>
      <Heading title={`Categories (${data.length})`} description="Manage categories for your store. "/>
      <Button onClick={()=>router.push(`/${params.storeId}/categories/6d795f757365725f69643030`)}>
        <Plus className='mr-2 h-4 w-4'/>
        Add New
      </Button>
    </div>
      <Separator/>
      <DataTable searchKey='name' columns={columns} data={data}/>
      <Heading title="API" description="API calls for categories"/>
      <Separator/>
      <ApiList entityName='categories' entityIdName='categoryId'/>
    </>
  )
}

export default CategoryClient
