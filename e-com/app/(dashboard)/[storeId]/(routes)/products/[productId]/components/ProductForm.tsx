"use client";

import {Category, Color, Image, Product, Size} from "@prisma/client";
import Heading from "../../../../../../../components/ui/Heading";
import {Button} from "../../../../../../../components/ui/button";
import {Trash} from "lucide-react";
import {Separator} from "../../../../../../../components/ui/separator";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../../../../components/ui/form";
import {Input} from "../../../../../../../components/ui/input";
import axios from "axios";
import toast from "react-hot-toast";
import {useParams, useRouter} from "next/navigation";
import AlertModal from "../../../../../../../components/modals/Alert-modal";
import {Alert} from "../../../../../../../components/ui/alert";
import ApiAlert from "../../../../../../../components/ui/api-alert";
import {useOrigin} from "@/hooks/use-origin";
import ImageUplaod from "../../../../../../../components/ui/image-uplaod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Checkbox} from "@/components/ui/checkbox";

interface ProductFormProps {
  initialData:
    | (Product & {
        images: Image[];
      })
    | null;

  categories: Category[];
  sizes: Size[];
  colors: Color[];
}

const formSchema = z.object({
  name: z.string().min(1),
  images: z.object({url: z.string()}).array(),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  sizeId: z.string().min(1),
  colorId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});

type ProductFromValues = z.infer<typeof formSchema>;

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  categories,
  sizes,
  colors,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const origin = useOrigin();

  console.log(initialData);
  

  const title = initialData ? "Edit Product" : "Create Product";
  const description = initialData ? "Edit a Product" : "Create a Product";
  const toastMsg = initialData ? "Product updated" : "Product created";
  const action = initialData ? "Save changes" : "Create";

  const params = useParams();
  const router = useRouter();

  const form = useForm<ProductFromValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      images: [],
      price: 0,
      sizeId: "",
      colorId: "",
      categoryId: "",
      isFeatured: false,
      isArchived: false,
    },
  });

  const onSubmit = async (data: ProductFromValues) => {
    try {
      setLoading(true);

      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/products/${params.productId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/products`, data);
      }
      router.push(`/${params.storeId}/products`);
      router.refresh();

      toast.success(toastMsg);
    } catch (error) {
      toast.error("Somthing went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.push(`/${params.storeId}/products`);
      router.refresh();

      toast.success("Product Deleted.");
    } catch (error) {
      toast.error(
        "Make sure you removed all categories using this billboard first."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator className="my-4" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
        >
            <div className="space-y-8">
            <FormField
            name="images"
            control={form.control}
            render={({field}) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUplaod
                    value={field.value.map((image) => image.url)}
                    disabled={loading}
                    onchange={(url) => field.onChange([...field.value, {url}])}
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((curImg) => curImg.url !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              name="name"
              control={form.control}
              render={({field}) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Product Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <FormField
              name="price"
              control={form.control}
              render={({field}) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Product Price"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <FormField
              name="categoryId"
              control={form.control}
              render={({field}) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        ></SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <FormField
              name="sizeId"
              control={form.control}
              render={({field}) => (
                
                <FormItem>
                 
                  <FormLabel>Size</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a size"
                        ></SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sizes.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />

            <FormField
              name="colorId"
              control={form.control}
              render={({field}) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a color"
                        ></SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colors.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          <div className="flex items-start justify-between w-full gap-x-3">
                            <div
                              className="h-5 w-5 rounded-full border p-0"
                              style={{backgroundColor: item.value}}
                            ></div>
                            {item.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <FormField
              name="isFeatured"
              control={form.control}
              render={({field}) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      //@ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>
                      This product will appear on the home page
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              name="isArchived"
              control={form.control}
              render={({field}) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      //@ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Archived</FormLabel>
                    <FormDescription>
                      This product will not appear anywhere in store.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
            </div>
         
        </form>
      </Form>
      <Separator className="my-4" />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${params.storeId}`}
        variant="public"
      />
    </>
  );
};

export default ProductForm;
