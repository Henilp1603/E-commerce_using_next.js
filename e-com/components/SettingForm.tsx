"use client";

import {Store} from "@prisma/client";
import Heading from "./ui/Heading";
import {Button} from "./ui/button";
import {Trash} from "lucide-react";
import { Separator } from "./ui/separator";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import AlertModal from "./modals/Alert-modal";
import { Alert } from "./ui/alert";
import ApiAlert from "./ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";

interface SettingFormProps {
  initialData: Store;
}

const formSchema=z.object({
    name:z.string().min(1)
})

type SettingFromValues=z.infer<typeof formSchema>



const SettingForm: React.FC<SettingFormProps> = ({initialData}) => {
  const [open,setOpen]=useState(false)
  const [loading,setLoading]=useState(false)

  const origin=useOrigin()

  const params=useParams()
  const router=useRouter()

  const form =useForm<SettingFromValues>({
    resolver:zodResolver(formSchema),
    defaultValues:initialData
  })

  const onSubmit=async(data:SettingFromValues)=>{
    try {
      setLoading(true)

      await axios.patch(`/api/stores/${params.storeId}`,data)
      router.refresh()

      toast.success("Store Updated.")
    
      
    } catch (error) {
      toast.error("Somthing went wrong.")
    }finally{
      setLoading(false)
    }
    
  }

  const onDelete=async()=>{
    try {
      setLoading(true)

      await axios.delete(`/api/stores/${params.storeId}`)
      router.refresh()
      router.push("/")

      toast.success("Store Deleted.")
     
      
    } catch (error) {
      toast.error("Make sure you removed all products and categories first.")
    }finally{
      setLoading(false)
      setOpen(false)
    }
    
  }


  return (
    <>
      <AlertModal isOpen={open} onClose={()=>setOpen(false)} onConfirm={onDelete} loading={loading}/>
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage store prefernces" />
        <Button disabled={loading} variant="destructive" size="icon" onClick={() => setOpen(true)}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator className="my-4" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="grid grid-cols-3 gap-8">
          <FormField 
                name='name'
                control={form.control}
                render={({field})=>(
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder='Store name' {...field} />
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
                />

          </div>
          <Button disabled={loading} className="ml-auto" type="submit">Save Changes</Button>
        </form>
      </Form>
      <Separator className="my-4"/>
      <ApiAlert title="NEXT_PUBLIC_API_URL" description={`${origin}/api/${params.storeId}`} variant="public"/>
    </>
  );
};

export default SettingForm;
