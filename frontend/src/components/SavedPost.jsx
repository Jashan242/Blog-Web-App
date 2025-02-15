import React, { useEffect, useState } from "react";
import PostList from "./PostList";
import { Link } from "react-router-dom";
import UserPost from "./UserPost";

function SavedPost() {
  const [savedPost, setSavedPost] = useState([]);
  const [userPost, setUserPost] = useState([]);

  useEffect(() => {
    savedPostData();
    userPostData();
  }, []);

  const savedPostData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/savedPosts`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      setSavedPost(data.savedPosts);
      console.log("savedPosts", data);
    } catch (error) {
      console.error(error);
    }
  };

  const userPostData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/posts`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      setUserPost(data.posts);
      // console.log("userPosts", data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto mt-6">

<h1 className="text-2xl font-bold mb-4">My Posts</h1>
      <div className="flex gap-2">
        {userPost.length > 0 ? (
          userPost.map(
            (
              postItem 
            ) => (
                <UserPost postItem={postItem} key={postItem}/>
            )
          )
        ) : (
          <p className="text-center text-gray-500 mt-6">No saved posts found</p>
        )}
      </div>

      <h1 className="text-2xl font-bold mt-8 mb-4">Saved Posts</h1>

      <div className="flex gap-2">
        {savedPost.length > 0 ? (
          savedPost.map(
            (
              postItem 
            ) => (
                <UserPost postItem={postItem} key={postItem}/>
            )
          )
        ) : (
          <p className="text-center text-gray-500 mt-6">No saved posts found</p>
        )}
      </div>
    </div>
  );
}

export default SavedPost;
