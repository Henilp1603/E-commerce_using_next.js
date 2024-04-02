"use client";
import React from "react";
import {SizeColumn, columns} from "./Columns";
import {useParams, useRouter} from "next/navigation";
import Heading from "@/components/ui/Heading";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {DataTable} from "@/components/ui/data-tabel";
import ApiList from "@/components/Api-list";

interface sizeclientProps {
  data: SizeColumn[];
}

const SizeClient: React.FC<sizeclientProps> = ({data}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes (${data.length})`}
          description="Manage sizes for your store. "
        />
        <Button
          onClick={() =>
            router.push(`/${params.storeId}/sizes/6d795f757365725f69643030`)
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API calls for sizes" />
      <Separator />
      <ApiList entityName="sizes" entityIdName="sizeId" />
    </>
  );
};

export default SizeClient;
