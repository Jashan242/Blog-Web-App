import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Actions from "./Actions";
import Comments from "./Comments";

function SinglePost() {

  const [post, setPost]=useState([]);

  const { id } = useParams();

  console.log(id);
  useEffect(()=>{
    if (id)
      fetchPost();
  }, [id])
  
  const fetchPost=async ()=>{
    try{
      const response=await fetch(`${import.meta.env.VITE_API_URL}/post/singlePost/${id}`);
      const data=await response.json();
      setPost(data);
      // console.log(post);
    }
    catch(error){
      console.error(error);
    }
  }


  console.log("post :",post.user);

  return (
    <div>
      <div className="flex gap-10 mt-10">
        <div className="lg:w-3/5 w-full flex flex-col justify-center gap-4">
          <Link to="/singlePost" className="text-2xl md:text-4xl font-semibold">
            {post.title}
          </Link>
          <div className="flex gap-4 items-center flex-wrap">
            <div>
              <span>Written By - </span>
              <Link to="#">{post.user?.username || "unknown"}</Link>
            </div>
            <span className="text-gray-400">{post.createdAt?.slice(0, 10)}</span>
          </div>
          <p className="text-gray-600 text-sm w-full">
            {post.desc}
          </p>
        </div>
        <div className="w-full lg:w-2/5">
          <img src={post.img} alt={post.title}
            className="rounded-2xl object-cover max-h-60 md:max-h-96 w-full"
          />
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8 mt-6">
        <div className="flex flex-col gap-6 lg:text-lg text-justify ">
          
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
        
        <div className="h-max sticky top-8 px-8">
          <h1 className="mt-8 mb-4 text-md font-bold">Author</h1>
          <div className="flex gap-2 items-center">
      
            <div className='px-2 bg-[#1E293B] text-white rounded-full flex items-center justify-center'>
                {post.user?.username.charAt(0).toUpperCase()}
            </div> 
            <Link to="#" className="font-bold">
              {post.user?.username || "unknown"}
            </Link>
          </div>
          <p className="mt-2 text-sm text-gray-500">{post.user?.bio}</p>
          <h1 className="mt-4 text-md font-bold">Actions</h1>
          <Actions/>
          <h1 className="mt-4 text-md font-bold">Category</h1>
          <p className="mt-2 text-sm text-gray-500 font-semibold">{post.category}</p>
        </div>
      </div>
      <Comments id={id}/>
    </div>
  );
}

export default SinglePost;
