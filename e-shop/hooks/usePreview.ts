import { Product } from "@/types";
import { create } from "zustand";


interface previewModalStore{
    isOpen:boolean;
    data?:Product;
    onOpen:(data:Product)=>void;
    onClose:()=>void;
}

const usePreviewModal =create<previewModalStore>((set)=>({
    isOpen:false,
    data:undefined,
    onOpen:(data:Product)=>set({data:data,isOpen:true}),
    onClose:()=>set({isOpen:false})
}))

export default usePreviewModal