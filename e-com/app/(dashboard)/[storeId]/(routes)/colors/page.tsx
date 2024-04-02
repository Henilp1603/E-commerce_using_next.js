import prismadb from "@/lib/prismadb";
import {format} from "date-fns";
import SizeClient from "./components/ColorClient";
import { ColorColumn } from "./components/Columns";
import ColorClient from "./components/ColorClient";

const ColorPage = async ({params}: {params: {storeId: string}}) => {
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSizeData: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient data={formattedSizeData} />
      </div>
    </div>
  );
};

export default ColorPage;
