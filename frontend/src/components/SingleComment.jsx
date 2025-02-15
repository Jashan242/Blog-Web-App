import { IKImage } from 'imagekitio-react'
import React from 'react'

function SingleComment({ comment }) {
  return (
    <div className='bg-gray-100 w-full p-4 rounded-xl shadow-sm'>
        <div className='flex items-center gap-4'>

            <div className='h-8 w-8 bg-[#1E293B] text-white rounded-full flex items-center justify-center'>
                {comment.user?.username ? comment.user?.username.charAt(0).toUpperCase() : "U"}
            </div> 
            
            <span className='text-md font-semibold'>{comment.user?.username}</span>
            <span className='text-sm text-gray-400'>{comment.createdAt?.slice(0, 10)}</span>
        </div>
        <p className='text-gray-700 mt-4'>{comment.desc}</p>
    </div>
  )
}

export default SingleComment