import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment'
import { toast } from 'react-toastify';

export default function Comments({id}) {
  const [comments, setComments] = useState([]);
  const [desc, setDesc] = useState("");

  useEffect(() =>{
    fetchComments();
  },[desc, id]);


  console.log("id", id)
  const fetchComments=async ()=>{
    try{
      const response=await fetch(`${import.meta.env.VITE_API_URL}/comment/${id}`);
      const data=await response.json();
      setComments(data);
      console.log("All comments",comments);
    }
    catch(error){
      console.error(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!desc.trim()) return;
    if (!id) {
      console.error("Post ID is missing!");
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("User is not logged in.");
        return;
      }
  
      const requestBody = {
        postId: id,
        desc: desc
      };
  
      console.log("Sending Request:", JSON.stringify(requestBody));
  
      const res = await fetch(`${import.meta.env.VITE_API_URL}/comment/create/`, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
  
      const data = await res.json();
      console.log("Response Status:", res.status);
      console.log("Response Data:", data);
  
      if (res.ok) {
        setComments([...comments, data]);
        setDesc("");
        toast.success("Comment added!");
      } else {
        console.error("Error from API:", data);
      }
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };
  

  return (
    <div className='flex flex-col gap-4 w-full mt-4 w-3/5'>
        <h1 className='text-xl font-bold'>Comments</h1>
        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
            <textarea value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder='Write a comment...' className='w-full bg-gray-100 rounded-xl shadow-lg px-4 py-2'/>
            <button type='submit' className='bg-blue-600 px-6 py-2 rounded-xl text-white font-bold'>Send</button>
        </form>
      {Array.isArray(comments) && comments.length > 0 ? (
  comments.map((comment) => (
    <SingleComment key={comment._id} comment={comment} />
  ))
) : (
  <p className="text-gray-500">No comments yet.</p> 
)}

       
    </div>
  )
}
