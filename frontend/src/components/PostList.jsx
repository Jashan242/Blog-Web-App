import React, { useEffect, useState } from 'react'
import PostListItem from './PostListItem'

export default function PostList({posts}) {

  if (!Array.isArray(posts)) {
    return <div>No posts available</div>;  
  }

  return (
    <div className='flex flex-col gap-4'>
    
      {posts.map((post)=>(
        <PostListItem key={post.id} post={post} />
      ))}
    </div>
  )
}
