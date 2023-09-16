import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function POST(
    req: Request,
    {params}: {params: {storeId: string}}
){
    try{

        const { userId } = auth();
        const body = await req.json();

        const { name, price, categoryId, colourId, sizeId, images, isFeatured, isArchived } = body; 

        if (!userId){
            return new NextResponse("Unauthenticated", {status: 401})
        }
        if (!name){
            new NextResponse("Name is required", {status: 400})
        }
        if (!price){
            new NextResponse("Price is required", {status: 400})
        }
        if (!categoryId){
            new NextResponse("Category ID is required", {status: 400})
        }
        if (!colourId){
            new NextResponse("Colour ID is required", {status: 400})
        }
        if (!sizeId){
            new NextResponse("Size ID is required", {status: 400})
        }
        if (!images || !images.length){
            new NextResponse("Images are required", {status: 400})
        }
        if(!params.storeId){
            new NextResponse("Store ID is required", {status: 400})
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if(!storeByUserId){
            return new NextResponse("Unauthorised", {status: 403})
        }

        const product = await prismadb.product.create({
            data: {
                name,
                price,
                isFeatured,
                isArchived,
                categoryId,
                colourId,
                sizeId,
                storeId: params.storeId,
                images: {
                    createMany : {
                        data: [
                            ...images.map((image : {url: string}) => image)
                        ]
                    }
                }
            }
        })

        return NextResponse.json(product);

    }catch(error){
        console.log("[PRODUCTS_POST]", error);
        return new NextResponse("Internal error" , {status : 500})
    }
}


export async function GET(
    req: Request,
    {params}: {params: {storeId: string}}
){
    try{

        const { searchParams } = new URL(req.url);
        const categoryId = searchParams.get("categoryId") || undefined; 
        const colourId = searchParams.get("colourId") || undefined; 
        const sizeId = searchParams.get("sizeId") || undefined; 
        const isFeatured = searchParams.get("isFeatured"); 

        if(!params.storeId){
            new NextResponse("Store ID is required", {status: 400})
        }

        const products = await prismadb.product.findMany({
            where:{
                storeId: params.storeId,
                categoryId, 
                colourId,
                sizeId, 
                isFeatured: isFeatured ? true : undefined,
                isArchived: false
            },
            include: {
                images: true,
                category: true,
                colour: true,
                size: true
            }
        })

        return NextResponse.json(products);

    }catch(error){
        console.log("[PRODUCTS_GET]", error);
        return new NextResponse("Internal error" , {status : 500})
    }
}