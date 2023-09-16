import prismadb from '@/lib/prismadb'
import React from 'react'
import { ColourForm } from './components/size-form'

const ColoursPage = async ({params} : {params : {colourId: string}}) => {

    const colour = await prismadb.colour.findUnique({
        where:{
            id: params.colourId
        }
    })
  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <ColourForm initialData={colour}/>
        </div>
    </div>
  )
}

export default ColoursPage
