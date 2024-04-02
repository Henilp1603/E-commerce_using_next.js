"use client";
import React from 'react'
import Heading from '../../../../../../components/ui/Heading';
import { Button } from '../../../../../../components/ui/button';
import { Plus } from 'lucide-react';
import { Separator } from '../../../../../../components/ui/separator';
import { useParams, useRouter } from 'next/navigation';
import { DataTable } from '../../../../../../components/ui/data-tabel';
import ApiList from '../../../../../../components/Api-list';
import { BillboardColumn, columns } from '@/app/(dashboard)/[storeId]/(routes)/billboards/components/Columns';


interface billboardclientProps{
  data:BillboardColumn[]
}



const BillboardClient:React.FC<billboardclientProps> = ({data}) => {
    const router = useRouter()
    const params = useParams()

    
  return (
    <>
    <div className='flex items-center justify-between'>
      <Heading title={`Billboards (${data.length})`} description="Manage billboards for your store. "/>
      <Button onClick={()=>router.push(`/${params.storeId}/billboards/6d795f757365725f69643030`)}>
        <Plus className='mr-2 h-4 w-4'/>
        Add New
      </Button>
    </div>
      <Separator/>
      <DataTable searchKey='label' columns={columns} data={data}/>
      <Heading title="API" description="API calls for billboards"/>
      <Separator/>
      <ApiList entityName='billboards' entityIdName='billboardId'/>
    </>
  )
}

export default BillboardClient
