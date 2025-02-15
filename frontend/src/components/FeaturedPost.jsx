import { IKImage } from "imagekitio-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FeaturedPost() {
  const [post, setPost] = useState([]);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/post/featured`.replace(/\/+$/, ""));
      const data = await response.json();
      setPost(Array.isArray(data.featuredPost) ? data.featuredPost : []);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-10 flex flex-col lg:flex-row gap-10">
      {post.length === 0 ? (
        <p>Loading Featured Posts...</p>
      ) : (
        <>
          {/* BIG FEATURED POST */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <img
              src={post[0]?.img }
              alt={post[0]?.title || "Featured Post"}
              className="rounded-3xl object-cover w-full h-[150px] lg:h-[350px]"
            />
            {/* Post details */}
            <div className="flex items-center gap-4 text-md">
              <h3 className="text-gray-800 font-semibold">
                {post[0]?.category.charAt(0).toUpperCase() + post[0]?.category.slice(1)}
              </h3>
              <span className="text-gray-500">{post[0]?.createdAt?.slice(0, 10)}</span>
            </div>
            <Link
              to={`/singlePost/${post[0]?._id}`}
              className="text-2xl lg:text-2xl font-bold"
            >
              {post[0]?.title || "Featured Post Title"}
            </Link>
          </div>

          {/* SMALLER POSTS */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            {post.map((postItem, index) => (
              <div key={index} className="flex items-start gap-4">
                <img
                  src={postItem.img}
                  alt={postItem.title}
                  className="rounded-3xl object-cover w-1/3 aspect-video"
                />
                <div className="w-2/3">
                  <div className="flex items-center gap-4 text-sm mb-2">
                    <Link to={`/category/${postItem.category}`} className="text-gray-800 font-semibold">
                      {postItem.category.charAt(0).toUpperCase() + postItem.category.slice(1)}
                    </Link>
                    <span className="text-gray-500">{postItem.createdAt?.slice(0, 10)}</span>
                  </div>
                  <Link
                    to={`/singlePost/${postItem._id}`}
                    className="text-lg lg:text-xl font-semibold leading-snug"
                  >
                    {postItem.title}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
