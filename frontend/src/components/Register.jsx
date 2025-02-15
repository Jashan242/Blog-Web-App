import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(null);

  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("bio", bio);
    // if (img) formData.append("img", image);

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}user/register`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      if (response.ok) {
        toast.success("User registered successfully");
        navigate("/login");

      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center mt-10">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg">
      <h1 className="text-center text-4xl font-bold mb-2 text-[#111e25]">Wordy Vibes</h1>
        <h2 className="text-center text-2xl font-semibold text-[#111e25] mb-6">
          Create Account
        </h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4 flex justify-between gap-2">
            <div>
              <label className="block text-gray-600 text-sm font-bold">
                First Name
              </label>
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="w-full py-1 px-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-bold">
                Last Name
              </label>
              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="w-full py-1 px-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full py-1 px-2 border border-gray-300 rounded-md"
          />
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-1 px-2 border border-gray-300 rounded-md"
          />
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full py-1 px-2 border border-gray-300 rounded-md"
          />
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full py-1 px-2 border border-gray-300 rounded-md"
          />
          <label className="block text-sm font-medium text-gray-700">
            Profile Image
          </label>
          <input
            type="file"
            // accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full py-1 px-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#111e25] text-white font-semibold rounded-md mt-4 hover:bg-white hover:text-[#111e25] hover:border-2 hover:border-[#111e25] hover:cursor-pointe"
          >
            Register
          </button>
          <p className="mt-2">
            Already registered?{" "}
            <Link
              to="/login"
              className="text-gray-500 font-semibold hover:underline"
            >
              Login Here!!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
