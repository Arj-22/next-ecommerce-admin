import React from 'react'
import PostClientProps from './components/client'
import prismadb from '@/lib/prismadb'
import { PostsColoumn } from './components/columns';
import { format } from "date-fns";

const PostsPage = async ({params} : {params : {storeId: string}}) => {
  const posts = await prismadb.post.findMany({
    where:{
      storeId: params.storeId
    }, 
    orderBy:{
      createdAt: "desc"
    }
  }); 

  const formattedPosts: PostsColoumn[] = posts.map((item) =>({
    id: item.id,
    name: item.name,
    title: item.title,
    content: item.content,
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }))

  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <PostClientProps data={formattedPosts}/>
        </div>
    </div>
  )
}

export default PostsPage
