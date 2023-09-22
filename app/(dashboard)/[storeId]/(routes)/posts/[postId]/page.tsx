import prismadb from '@/lib/prismadb'
import React from 'react'
import { PostForm } from './components/post-form'

const PostPage = async ({params} : {params : {postId: string, storeId: string}}) => {

    const post = await prismadb.post.findUnique({
        where:{
            id: params.postId
        }
    })

  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <PostForm initialData={post} name={''} postTitle={''} content={''} />
        </div>
    </div>
  )
}

export default PostPage