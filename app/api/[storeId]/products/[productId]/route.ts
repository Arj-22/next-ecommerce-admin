import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"



export async function GET (req: Request, { params } : {params: {productId: string}} ){

    try{
        if(!params.productId){
            return new NextResponse("Product ID is required", {status: 400})
        }

        const product = await prismadb.product.findUnique({
            where: {
                id: params.productId
            },
            include: {
                images: true,
                category: true,
                size: true,
                colour: true
            }
        }); 

        return NextResponse.json(product); 

    }catch(error){

        console.log("[PRODUCT_GET]", error)

        return new NextResponse("Internal error", {status:500});

    }

}


export async function PATCH (req: Request, { params } : {params: {storeId: string, productId: string}} ){

    try{
        const { userId } = auth();
        const body = await req.json();
        const { name, price, categoryId, colourId, sizeId, images, isFeatured, isArchived } = body; 

        if(!userId){
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
        if(!params.productId){
            return new NextResponse("Billboard id is required", {status: 400})
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        await prismadb.product.update({
            where: {
                id: params.productId,
            },
            data:{
                name,
                price,
                categoryId,
                colourId,
                sizeId,
                images: {
                    deleteMany: {}
                },
                isFeatured, 
                isArchived
            }
        }); 

        const product = await prismadb.product.update({
            where: {
                id: params.productId
            },
            data: {
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: {url: string}) => image)
                        ]
                    }
                }
            }
        })
        return NextResponse.json(product); 

    }catch(error){

        console.log("[PRODUCT_PATCH]", error)

        return new NextResponse("Internal error", {status:500});

    }

}


export async function DELETE (req: Request, { params } : {params: {storeId: string, productId: string}} ){

    try{
        const { userId } = auth();

        if(!userId){
            return new NextResponse("Unauthenticated", {status: 401})
        }

        if(!params.productId){
            return new NextResponse("Product id is required", {status: 400})
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })
        const product = await prismadb.product.deleteMany({
            where: {
                id: params.productId
            }
        }); 

        return NextResponse.json(product); 

    }catch(error){

        console.log("[PRODUCT_DELETE]", error)

        return new NextResponse("Internal error", {status:500});

    }

}