import React from "react";
import { Link } from "react-router-dom";

export default function PostListItem({post}) {
  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="md:hidden xl:block">
        <img src={post.img}
          alt={post.title}
          className="rounded-2xl object-cover h-[200px] w-[350px]"
        />
      </div>
      <div className="flex flex-col gap-2">
      <Link to={`/singlePost/${post._id}`} className="text-4xl font-semibold">
      {post.title}
      </Link>

      {/* details */}
      <div className="flex gap-4 items-center">

        <div>
          <span>Written By - </span>
          <Link to="#">{post.user?.username}</Link>
        </div>

        <span className="text-gray-400">{post.createdAt?.slice(0, 10)}</span>
      </div>
      <p>{post.desc}</p>
      <Link to={`/singlePost/${post._id}`} className="text-blue-700 underline">Read More</Link>
      </div>
      
    </div>
  );
}
