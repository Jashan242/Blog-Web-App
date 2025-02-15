import React, { useEffect, useState } from 'react'
import {useUser} from "@clerk/clerk-react"
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("general");
  const [desc, setDesc] = useState("");
  const [content, setContent] = useState("");

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline'],
      [{ 'align': [] }],
      ['link'],
    ],
  };

  const formats = [
    'header', 'font', 'list', 'bullet', 'bold', 'italic', 'underline', 'align', 'link',
  ];


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("desc", desc);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch("http://localhost:3030/post/", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming authentication is required
        },
      });

      const data = await response.json();

      if (response.ok) {
        alert("Post created successfully!");
        console.log("✅ Post Created:", data);
      } else {
        console.error("❌ Error:", data.error);
        alert("Error creating post: " + data.error);
      }
    } catch (error) {
      console.error("❌ Network Error:", error);
      alert("Failed to create post. Please try again later.");
    }
  };

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col gap-6 mt-10">
      <h1 className="text-xl font-bold">Create a New Post</h1>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="py-3 text-gray-500 text-xl rounded-xl shadow-sm w-max px-4"
        />
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          className="text-xl outline-none py-2 px-4 rounded-xl shadow-sm text-gray-700"
        />
        <div className="flex gap-4 items-center">
          <label className="text-sm font-semibold">Choose a category:</label>
          <select
            name="cat"
            className="p-2 rounded-xl shadow-md"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="general">General</option>
            <option value="technology">Technology</option>
            <option value="marketing">Marketing</option>
            <option value="business">Business</option>
            <option value="travelling">Travelling</option>
            <option value="fashion">Fashion</option>
          </select>
        </div>
        <textarea
          name="desc"
          onChange={(e) => setDesc(e.target.value)}
          placeholder="A short description"
          className="py-2 px-4 rounded-xl shadow-sm outline-none text-gray-500"
        />
        <ReactQuill theme="snow" value={content} className="" onChange={setContent}  modules={modules}
          formats={formats}/>
        <button
          type="submit"
          className="w-max px-4 py-2 rounded-xl mt-10 text-lg font-bold text-white bg-[#e13d3d] hover:bg-[#ff4d4d] transition-all"
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
