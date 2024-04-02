"use client";

import React, { useState } from 'react'
import Modal from '../ui/modal';
import { useStoreModal } from '@/hooks/use-store-modal';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import axios from "axios";
import toast from 'react-hot-toast';


const formSchema=z.object({
  name:z.string().min(1)
})

const StoreModal = () => {
    const storeModal=useStoreModal()
    const [loading,setLoading]=useState(false)

    const form=useForm<z.infer<typeof formSchema>>({
      resolver:zodResolver(formSchema),
      defaultValues:{
        name:""
      }
    })

    const onSubmit=async(value:z.infer<typeof formSchema>)=>{
      try {
        setLoading(true)

        const res=await axios.post("/api/stores",value)

        window.location.assign(`/${res.data.id}`)
        
      } catch (error) {
        toast.error("Somthing went wrong.")
      }finally{
        setLoading(false)
      }
    }


  return (
    <Modal title="Create Store" description="Add a new store to manage products and categories " isOpen={storeModal.isOpen} onClose={storeModal.onClose} >
        <div>
          <div className='space-y-4 py-4 pb-4'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField 
                name='name'
                control={form.control}
                render={({field})=>(
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder='E-commerce' {...field} />
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
                />
                <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
                  <Button disabled={loading} variant="outline" onClick={storeModal.onClose}>Cancel</Button>
                  <Button disabled={loading} type='submit'>Continue</Button>

                </div>
              </form>
            </Form>
          </div>
        </div>
    </Modal>
  )
}

export default StoreModal
