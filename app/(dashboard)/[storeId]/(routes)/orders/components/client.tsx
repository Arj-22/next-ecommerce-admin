"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { OrderColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface OrderClientProps{
  data: OrderColumn[]
}

const OrderClient: React.FC<OrderClientProps> = ({ data }) => {

  const router = useRouter();   
  const params = useParams(); 

  // If adding API and action for orders make sure you change the cell-action.tsx file 

  return (
    <>
    {/* <div className="flex items-center justify-between"> */}
        <Heading title={`Orders (${data.length})`} description="Manage Orders for your store"/>
        {/* <Button onClick={() => router.push(`/${params.storeId}/orders/new`)}>
            <Plus className="mr-2 h-4 w-4"/>
            Add New
        </Button> */}
    {/* </div> */}
    <Separator/>
    <DataTable searchKey="products" columns={columns} data={data}/>
    {/* <Heading title="API" description="API calls for Billboards"/>
    <Separator/>
    <ApiList entityName="orders" entityIdName="orderId"/> */}
    </>
  )
}

export default OrderClient
