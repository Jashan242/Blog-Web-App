import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider, signInWithPopup, signOut } from "../firebase";
import google from '../assets/google.png'
import { toast } from "react-toastify";

export default function LoginTwo() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("User", result);
        localStorage.setItem("token", result.token);
        localStorage.setItem('username', result.username);
        navigate("/home");
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Handle Google Sign-in
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      localStorage.setItem("token", result.user.accessToken);
      navigate("/");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem("token");
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="flex items-center justify-center mt-18 bg-transparent  min-h-full"> 
      <div className="p-8 rounded-lg shadow-xl">
      <h1 className="text-center text-4xl font-bold mb-2 text-[#111e25]">Wordy Vibes</h1>
        <h2 className="text-center text-2xl font-semibold mb-6 text-[#111e25]">Login Here!!</h2>

        {/* Google Sign-In Section */}
        {user ? (
          <div className="text-center">
            <img src={user.photoURL} alt="User Avatar" className="rounded-full w-16 h-16 mx-auto" />
            <h3 className="text-lg font-semibold mt-2">{user.displayName}</h3>
            <p className="text-sm">{user.email}</p>
            <button
              onClick={handleLogout}
              className="mt-4 px-4 py-2 rounded"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={handleGoogleLogin}
            className=" px-6 py-3 rounded mb-4"
          >
          <div className="flex items-center justify-center gap-1 border-[#111e25] border-2 p-2 px-6 rounded-xl text-[#111e25] font-bold hover:border-gray-400 hover:cursor-pointer">
            <img src={google} alt='google' className="h-8 w-8"/>
            <h1>Sign in with Google</h1>
          </div>
          </button>
        )}

        {/* OR Divider */}
        <div className="flex items-center justify-center my-4">
          <hr className="w-1/3 border-gray-300" />
          <span className="mx-2 text-gray-500">OR</span>
          <hr className="w-1/3 border-gray-300" />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-2 py-1 border border-gray-300 rounded-md"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-2 py-1 border border-gray-300 rounded-md"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-2 px-4 text-white bg-[#111e25] font-semibold border-2 rounded-md hover:bg-white hover:text-[#111e25] hover:border-2 hover:border-[#111e25] hover:cursor-pointer"
            >
              Login
            </button>
          </div>
          <div className="flex justify-between items-center mt-2">
          <Link to='/reset-password' className="text-gray-500 font-semibold text-sm">Forgotten Password ?</Link>
          <Link to='/register' className="text-[#111e25] font-semibold hover:underline">Register Here!!</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
