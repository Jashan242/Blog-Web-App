import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import write from '../assets/write.svg';
import { toast } from 'react-toastify';

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const navigate = useNavigate();
    const username = localStorage.getItem('username');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        toast.success('Logged out successfully');
        navigate('/home');
    };

    return (
        <div className='w-full h-16 md:h-20 flex items-center justify-between px-4'>

            {/* LOGO (Left Side) */}
            <div className='text-4xl font-bold font-serif'>Wordy Vibes</div>

            {/* HAMBURGER MENU (Right Side) */}
            <div className='md:hidden cursor-pointer'>
                <button onClick={() => setOpen(!open)} className="text-3xl">
                    ☰
                </button>
            </div>

            {/* MOBILE MENU */}
            <div className={`fixed top-0 right-0 w-3/4 h-full bg-white z-50 flex flex-col items-center transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}>
                {/* Close Button */}
                <button onClick={() => setOpen(false)} className="absolute top-4 right-6 text-3xl font-bold">
                    ✕
                </button>

                {/* Mobile Navigation Links */}
                <Link to="/home" className="text-lg font-semibold py-2" onClick={() => setOpen(false)}>Home</Link>
                <Link to="/" className="text-lg font-semibold py-2" onClick={() => setOpen(false)}>About</Link>
                <Link to={username ? "/write" : "/login"} className="text-lg font-semibold py-2" onClick={() => setOpen(false)}>Write</Link>
            </div>

            {/* DESKTOP NAVIGATION */}
            <div className='hidden md:flex gap-4 font-semibold text-lg text-[#1E293B]'>
                <Link to='/home'>Home</Link>
                <Link to='/'>About</Link>
                <div className='flex items-center justify-center gap-1'>
                    <Link to={username ? "/write" : "/login"}>Write</Link>
                    <img src={write} className='h-6 w-6' alt="write-icon"/>
                </div>

                {/* USER PROFILE DROPDOWN */}
                {username && (
                    <div className="relative">
                        <button
                            className="px-2 bg-[#1E293B] text-white rounded-full flex items-center justify-center cursor-pointer"
                            onClick={() => setDropdown(!dropdown)}
                        >
                            {username.charAt(0).toUpperCase()}
                        </button>

                        {dropdown && (
                            <div className="absolute flex flex-col top-8 left-0 bg-white shadow-lg rounded-lg px-4 py-1 text-md">
                                <Link to="/profile" className="text-gray-500 hover:cursor-pointer hover:text-black">
                                    Profile
                                </Link>
                                <button 
                                    className="text-gray-500 hover:cursor-pointer hover:text-black"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
