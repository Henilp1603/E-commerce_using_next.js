"use client";

import {ColumnDef} from "@tanstack/react-table";
import CellAction from "./Cell-actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ColorColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const columns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell:({row})=>(
      <div className="flex items-center gap-x-2">
        {row.original.value}
        <div className="h-5 w-5 rounded-full border" style={{backgroundColor:row.original.value}}></div>
      </div>
    )
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />,
  },
];
