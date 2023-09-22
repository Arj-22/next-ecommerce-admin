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

        const { name, title, content} = body; 

        if (!userId){
            return new NextResponse("Unauthenticated", {status: 401})
        }
        if (!name){
            new NextResponse("Name is required", {status: 400})
        }
        if (!title){
            new NextResponse("Title is required", {status: 400})
        }
        if (!content){
            new NextResponse("Content is required", {status: 400})
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

        const post = await prismadb.post.create({
            data: {
                name,
                title,
                content,
                storeId: params.storeId
            }
        })

        return NextResponse.json(post);

    }catch(error){
        console.log("[POSTS_POST]", error);
        return new NextResponse("Internal error" , {status : 500})
    }
}


export async function GET(
    req: Request,
    {params}: {params: {storeId: string}}
){
    try{

        const { searchParams } = new URL(req.url);
        // const categoryId = searchParams.get("categoryId") || undefined; 
        // const colourId = searchParams.get("colourId") || undefined; 
        // const sizeId = searchParams.get("sizeId") || undefined; 
        // const isFeatured = searchParams.get("isFeatured"); 

        if(!params.storeId){
            new NextResponse("Store ID is required", {status: 400})
        }

        const posts = await prismadb.post.findMany({
            where:{
                storeId: params.storeId,

            }
        })

        return NextResponse.json(posts);

    }catch(error){
        console.log("[POSTS_GET]", error);
        return new NextResponse("Internal error" , {status : 500})
    }
}