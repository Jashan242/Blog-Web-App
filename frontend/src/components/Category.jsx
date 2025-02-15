import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import search from "../assets/search.svg";
import FeaturedPost from "./FeaturedPost";
import PostList from "./PostList";

export default function Category({ posts }) {
  const [post, setPost] = useState([]);
  const [input, setInput] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [cat, setCat] = useState(null);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    setPost(posts);
    setFilterData(posts);
  }, [posts]);

  useEffect(() => {
    filterPosts(post, input, cat);
  }, [input, post, cat]);

  // Filter posts based on search query
  const filterPosts = (posts, query, cat) => {
    let filtered = posts;
    if (cat) {
      console.log("cat", cat);
      filtered = filtered.filter((post) => post.category === cat);
    }
    if (query) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.desc.toLowerCase().includes(query.toLowerCase())
      );
    }
    setFilterData(filtered);
    console.log(filtered);
  };

  return (
    <div>
      <div className="mt-4 hidden md:flex bg-white rounded-3xl xl:rounded-full p-4 shadow-lg items-center justify-center gap-16">
        <div className="flex-1 flex items-center justify-between flex-wrap">
          <Link
            to="/home"
            onClick={() => {
              setFilterData(posts);
              setSelected(null);
            }}
            className={`${
              selected != null
                ? ""
                : "bg-[#e13d3d] px-4 py-2 rounded-full shadow-lg font-semibold text-white"
            }`}
          >
            All Posts
          </Link>
          <Link
            to="/home"
            onClick={() => {
              setCat("technology");
              setSelected("technology");
            }}
            className={`${
              selected == "technology"
                ? "bg-[#e13d3d] px-4 py-2 rounded-full shadow-lg font-semibold text-white"
                : ""
            }`}
          >
            Technology
          </Link>
          <Link
            to="/home"
            onClick={() => {
              setCat("business");
              setSelected("business");
            }}
            className={`${
              selected == "business"
                ? "bg-[#e13d3d] px-4 py-2 rounded-full shadow-lg font-semibold text-white"
                : ""
            }`}
          >
            Business
          </Link>
          <Link
            to="/home"
            onClick={() => {
              setCat("marketing");
              setSelected("marketing");
            }}
            className={`${
              selected == "marketing"
                ? "bg-[#e13d3d] px-4 py-2 rounded-full shadow-lg font-semibold text-white"
                : ""
            }`}
          >
            Marketing
          </Link>
          <Link
            to="/home"
            onClick={() => {
              setCat("motivation");
              setSelected("motivation");
            }}
            className={`${
              selected == "motivation"
                ? "bg-[#e13d3d] px-4 py-2 rounded-full shadow-lg font-semibold text-white"
                : ""
            }`}
          >
            Motivation
          </Link>
          <Link
            to="/home"
            onClick={() => {
              setCat("travelling");
              setSelected("travelling");
            }}
            className={`${
              selected == "travelling"
                ? "bg-[#e13d3d] px-4 py-2 rounded-full shadow-lg font-semibold text-white"
                : ""
            }`}
          >
            Travelling
          </Link>
          <Link
            to="/home"
            onClick={() => {
              setCat("fashion");
              setSelected("fashion");
            }}
            className={`${
              selected == "fashion"
                ? "bg-[#e13d3d] px-4 py-2 rounded-full shadow-lg font-semibold text-white"
                : ""
            }`}
          >
            Fashion
          </Link>
        </div>
        <span className="text-xl font-bold">|</span>

        <div className="flex items-center font-semibold px-4 py-2 rounded-full bg-gray-100 shadow-lg gap-2">
          <input
            type="text"
            placeholder="Search posts..."
            className="outline-none bg-transparent"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && filterPosts(post, input)}
          />
          <img
            src={search}
            className="h-10 w-10 cursor-pointer"
            onClick={() => filterPosts(post, input)}
          />
        </div>
      </div>

      {selected === null ? <FeaturedPost /> : ""}

      {/* <FeaturedPost /> */}

      <div>
        <h1 className="my-6 text-xl text-gray-400">Recent Post</h1>
        {filterData.length > 0 ? (
          <PostList posts={filterData} />
        ) : (
          <p className="text-center text-gray-500 mt-6">No posts found</p>
        )}
      </div>
    </div>
  );
}
