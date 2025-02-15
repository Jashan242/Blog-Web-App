import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

function EditProfile({ user, onClose, onSave }) {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    bio: "",
    img: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        username: user.username || "",
        email: user.email || "",
        bio: user.bio || "",
        img: user.img || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Profile updated successfully!");
        onSave(data); 
        onClose(); 
      } else {
        toast.error(data.error || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-lg flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <div className="flex justify-between">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <h3 onClick={()=>onClose(false)} className="font-bold text-red-700 hover:cursor-pointer">X</h3>
      </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Bio"
            className="w-full p-2 border rounded"
          ></textarea>
          <input
            type="text"
            name="img"
            value={formData.img}
            onChange={handleChange}
            placeholder="Profile Image URL"
            className="w-full p-2 border rounded"
          />
          <div className="flex justify-between">
            <button type="button" onClick={onClose} className="text-red-500">Cancel</button>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded" onClick={()=>handleSubmit()}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
