"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

export type ColourColumn = {
  id: string
  name: string
  value: string
  createdAt: string
}

export const columns: ColumnDef<ColourColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({row}) => (
      <div className="flex items-center gap-x-2">
        {row.original.value}
        <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: row.original.value}}></div>
      </div>
    )
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
    // row.original refernces original object that the component is interacting with
    // in this case SizeColumn
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original}/>
  }
]
