"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

export type ProductColumn = {
  id: string
  name: string
  price: string
  size: string
  category: string
  colour: string
  isFeatured: boolean
  isArchived: boolean
  createdAt: string
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "colour",
    header: "Colour",
    cell: ({row}) => (
      <div className="flex items-center gap-x-2">
        {row.original.colour}
        <div className="h-6 w-6 rounded-full border" style={{backgroundColor: row.original.colour}}/>
      </div>
    )
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
    // row.original refernces original object that the component is interacting with
    // in this case BillBoardColumn
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original}/>
  }
]