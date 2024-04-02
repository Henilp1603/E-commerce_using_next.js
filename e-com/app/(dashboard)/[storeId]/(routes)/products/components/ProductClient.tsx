"use client";
import React from 'react'
import Heading from '../../../../../../components/ui/Heading';
import { Button } from '../../../../../../components/ui/button';
import { Plus } from 'lucide-react';
import { Separator } from '../../../../../../components/ui/separator';
import { useParams, useRouter } from 'next/navigation';
import { DataTable } from '../../../../../../components/ui/data-tabel';
import ApiList from '../../../../../../components/Api-list';

import { ProductColumn, columns } from './Columns';


interface productclientProps{
  data:ProductColumn[]
}



const ProductClient:React.FC<productclientProps> = ({data}) => {
    const router = useRouter()
    const params = useParams()

    
  return (
    <>
    <div className='flex items-center justify-between'>
      <Heading title={`Products (${data.length})`} description="Manage products for your store. "/>
      <Button onClick={()=>router.push(`/${params.storeId}/products/6d795f757365725f69643030`)}>
        <Plus className='mr-2 h-4 w-4'/>
        Add New
      </Button>
    </div>
      <Separator/>
      <DataTable searchKey='name' columns={columns} data={data}/>
      <Heading title="API" description="API calls for products"/>
      <Separator/>
      <ApiList entityName='products' entityIdName='productId'/>
    </>
  )
}

export default ProductClient
