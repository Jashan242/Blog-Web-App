import React from 'react'
import { Link } from 'react-router-dom'

function UserPost({postItem}) {
  return (
    <div>
        <Link
                to={`/singlePost/${postItem._id}`}
                key={postItem._id}
                className="flex flex-col gap-2"
              >
                <div className="md:hidden xl:block">
                  <img
                    src={postItem.img}
                    alt={postItem.title}
                    className="rounded-2xl object-cover h-[150px] w-[250px] hover:transform hover:scale-105 transition duration-500 ease-in-out"
                  />
                </div>
                <p className="text-sm font-semibold"> {postItem.title}</p>
              </Link>
    </div>
  )
}

export default UserPost