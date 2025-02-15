import React, { useEffect, useState } from "react";
import Category from "./Category";

function Home() {
  const [posts, setPost] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}post/`);
      const data = await response.json();
      setPost(data);
      // console.log(posts);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-4 fle flex-col gap-4">
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-2xl mt-2 md:text-5xl lg:text-6xl font-bold text-black">
          Welcome to Wordy Vibes
        </h1>
        <p className="font-semibold text-sm md:text-lg lf:text-xl mt-2 text-gray-500">
          Dive into a world of words, where ideas flow freely, stories come
          alive, and inspiration is just a click away.
        </p>
      </div>
      <Category posts={posts} />
    </div>
  );
}

export default Home;
