import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"



export async function GET (req: Request, { params } : {params: {postId: string}} ){

    try{
        if(!params.postId){
            return new NextResponse("Post ID is required", {status: 400})
        }

        const post = await prismadb.post.findUnique({
            where: {
                id: params.postId
            }
        }); 

        return NextResponse.json(post); 

    }catch(error){

        console.log("[POST_GET]", error)

        return new NextResponse("Internal error", {status:500});

    }

}


export async function PATCH (req: Request, { params } : {params: {storeId: string, postId: string}} ){

    try{
        const { userId } = auth();
        const body = await req.json();
        const { name, title, content } = body; 

        if(!userId){
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
        if(!params.postId){
            return new NextResponse("Post id is required", {status: 400})
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        const post = await prismadb.post.update({
            where: {
                id: params.postId,
            },
            data:{
                name,
                title, 
                content
            }
        }); 
        return NextResponse.json(post); 

    }catch(error){

        console.log("[POST_PATCH]", error)

        return new NextResponse("Internal error", {status:500});

    }

}


export async function DELETE (req: Request, { params } : {params: {storeId: string, postId: string}} ){

    try{
        const { userId } = auth();

        if(!userId){
            return new NextResponse("Unauthenticated", {status: 401})
        }

        if(!params.postId){
            return new NextResponse("Product id is required", {status: 400})
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })
        const post = await prismadb.post.deleteMany({
            where: {
                id: params.postId
            }
        }); 

        return NextResponse.json(post); 

    }catch(error){

        console.log("[POST_DELETE]", error)

        return new NextResponse("Internal error", {status:500});

    }

}