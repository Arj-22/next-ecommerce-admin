"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

export type PostsColoumn = {
  id: string
  name: string
  title : string
  content: string
  createdAt: string
}

export const columns: ColumnDef<PostsColoumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "content",
    header: "Content",
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
