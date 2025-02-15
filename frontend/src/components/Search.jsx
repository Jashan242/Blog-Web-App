import React from 'react'
import search from "../assets/search.svg"
export default function Search() {
  return (
    <div className='flex items-center font-semibold px-4 py-2 mt-6 rounded-full w-65 bg-gray-100 shadow-lg gap-2'>
      <input type='text' placeholder='search' className='outline-none'></input>
      <img src={search} className='h-8 w-8'/>
    </div>
  )
}
