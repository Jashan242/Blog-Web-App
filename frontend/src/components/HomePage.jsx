import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [open, setOpen] = useState(false); 
  const token=localStorage.getItem('token');

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="flex justify-between items-center px-6 lg:px-20 py-4 shadow-lg relative">
        <h1 className="text-2xl font-bold font-serif text-[#111e25]">Wordy Vibes</h1>

        <div className="hidden md:flex space-x-6 text-lg justify-center items-center">
          <Link to={token ? "/write" : "/login" }className="hover:underline text-[#111e25]">Write</Link>
          <Link to='/login' className="hover:underline text-[#111e25]">Sign in</Link>
          <Link to='/register' className="bg-[#111e25] text-white px-4 py-2 rounded-full">Get started</Link>
        </div>

        <button 
          className="md:hidden text-3xl" 
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        <div className={`fixed top-0 right-0 w-3/4 h-full bg-white z-50 flex flex-col items-center transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}>
          <button 
            onClick={() => setOpen(false)} 
            className="absolute top-4 right-6 text-3xl font-bold"
          >
            ✕
          </button>
          <Link to="/write" className="text-lg font-semibold py-2" onClick={() => setOpen(false)}>Write</Link>
          <Link to="/login" className="text-lg font-semibold py-2" onClick={() => setOpen(false)}>Sign in</Link>
          <Link to="/register" className="bg-[#111e25] text-white px-4 py-2 rounded-full mt-2" onClick={() => setOpen(false)}>Get started</Link>
        </div>
      </nav>
      <section className="flex flex-col items-center justify-center text-center px-6 lg:px-20 py-16">
        <h1 className="text-5xl lg:text-7xl text-[#111e25] font-serif font-bold">Wordy Vibes</h1>
        <p className="text-lg lg:text-xl mt-4 max-w-2xl font-semibold text-gray-700">
          A space for writers, thinkers, and dreamers. Read, write, and get inspired.
        </p>
        <p className="text-lg lg:text-xl mt-4 px-6 font-semibold text-gray-500">
          Welcome to Wordy Vibes, a blog dedicated to sharing our creative, thought-provoking stories.
          Read our latest posts, join our community, and discover new ideas.
        </p>
        <Link to="/home">
          <button className="bg-[#111e25] text-white px-6 py-3 rounded-full mt-6 text-lg cursor-pointer">Start Reading</button>
        </Link>
      </section>
    </div>
  );
}
