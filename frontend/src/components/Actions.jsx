import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import save from "../assets/save.svg";
import deleteImg from "../assets/deleteImg.svg";
import setSave from "../assets/setSave.svg";
import { toast } from "react-toastify";

export default function Actions() {
  const { id } = useParams(); 
  const [isSaved, setIsSaved] = useState(false); 
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        if (!token) return;
        
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user/savedPosts`, {
          headers: { "Authorization": `Bearer ${token}` },
        });
        const data = await response.json();

        if (response.ok) {
          setIsSaved(data.savedPosts.includes(id)); 
        } else {
          console.error("Failed to fetch saved posts");
        }
      } catch (error) {
        console.error("Error fetching saved posts:", error);
      }
    };

    fetchSavedPosts();
  }, [id, token]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      if (!token) {
        toast.error("User is not authenticated!");
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/post/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });

      if (response.ok) {
        toast.success("Post deleted successfully!");
        navigate("/"); // Redirect to homepage
      } else {
        toast.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("An error occurred while deleting the post.");
    }
  };

  const handleSaveToggle = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/post/save/${id}`, {
        method: isSaved ? "DELETE" : "POST", 
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setIsSaved(!isSaved); // Toggle state
        toast.success(isSaved ? "Post removed from saved!" : "Post saved successfully!");
      } else {
        toast.error("Failed to update saved post status.");
      }
    } catch (error) {
      console.error("Error saving/removing post:", error);
      toast.error("An error occurred while updating saved posts.");
    }
  };

  return (
    <div className="mt-4 flex flex-col gap-2">
      <div className="flex gap-2 items-center cursor-pointer" onClick={handleSaveToggle}>
        <img src={isSaved ? setSave : save} alt="save" className="w-10 h-10" />
        <h1>{isSaved ? "Unsave Post" : "Save the Post"}</h1>
      </div>
      <div className="flex gap-2 items-center cursor-pointer" onClick={handleDelete}>
        <img src={deleteImg} alt="delete" className="w-8 h-8" />
        <h1 className="text-red-600">Delete the Post</h1>
      </div>
    </div>
  );
}
