"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

export type BillboardColumn = {
  id: string
  label: string
  createdAt: string
}

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
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
