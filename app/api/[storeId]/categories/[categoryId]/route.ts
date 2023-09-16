import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"



export async function GET (req: Request, { params } : {params: {categoryId: string}} ){

    try{

        const category = await prismadb.category.findUnique({
            where: {
                id: params.categoryId
            }
        }); 

        return NextResponse.json(category); 

    }catch(error){

        console.log("[CATEGORY_GET]", error)

        return new NextResponse("Internal error", {status:500});

    }

}


export async function PATCH (req: Request, { params } : {params: {storeId: string, categoryId: string}} ){

    try{
        const { userId } = auth();
        const body = await req.json();
        const { name, billboardId } = body; 

        // API Route Validation 

        if(!userId){
            return new NextResponse("Unauthenticated", {status: 401})
        }

        if(!name){
            return new NextResponse("Name is required", {status: 400})
        }
        if(!billboardId){
            return new NextResponse("Billboard ID is required", {status: 400})
        }
        if(!params.categoryId){
            return new NextResponse("Category ID is required", {status: 400})
        }

        // GET Data 

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        const category = await prismadb.category.updateMany({
            where: {
                id: params.categoryId,
            },
            data:{
                name,
                billboardId
            }
        }); 

        return NextResponse.json(category); 

    }catch(error){

        console.log("[CATEGORY_PATCH]", error)

        return new NextResponse("Internal error", {status:500});

    }

}


export async function DELETE (req: Request, { params } : {params: {storeId: string, categoryId: string}} ){

    try{
        const { userId } = auth();

        if(!userId){
            return new NextResponse("Unauthenticated", {status: 401})
        }

        if(!params.categoryId){
            return new NextResponse("Category ID is required", {status: 400})
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })
        const category = await prismadb.category.deleteMany({
            where: {
                id: params.categoryId
            }
        }); 

        return NextResponse.json(category); 

    }catch(error){

        console.log("[CATEGORY_DELETE]", error)

        return new NextResponse("Internal error", {status:500});

    }

}