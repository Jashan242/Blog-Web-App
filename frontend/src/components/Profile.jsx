import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserDtls from './UserDtls';
import EditProfile from './EditProfile';
import SavedPost from './SavedPost';

function Profile() {

    const [user, setUser]=useState([]);
    const [activeTab, setActiveTab] = useState("home"); 
    const [editPage, setEditPage] = useState(false);

    useEffect(()=>{
        fetchdata();
    }, [])

    const fetchdata=async ()=>{
        try{
          const response=await fetch(`${import.meta.env.VITE_API_URL}user/`,{
            method:'GET',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
          });
          const data=await response.json();
          setUser(data);
          // console.log("user details",data);
        }
        catch(error){
          console.error(error);
        }
      }

      return (
        <div className="flex flex-col gap-8 md:flex-row min-h-screen p-6 bg-gray-50">
         
          <div className="md:w-3/4 w-full space-y-6">
          
            <h1 className="text-4xl font-bold">{user.username}</h1>
    
            <div className="flex space-x-6 border-b">
              <button className="py-2 text-gray-500 hover:text-black hover:underline font-semibold" onClick={() => setActiveTab("home")}>
                Home
              </button>
              <button className="py-2 text-gray-500 hover:text-black hover:underline font-semibold" onClick={() => setActiveTab("about")}>
                About
              </button>
            </div>
    
            {activeTab === "about" ? <UserDtls user={user}/> : <SavedPost/>}
            {/* Reading List Section */}
            
          </div>
    
          
          <div className="md:w-1/4 w-full flex flex-col items-center md:items-start  mt-6 md:mt-0">
           
            <div className="w-20 h-20 bg-[#1E293B] text-white rounded-full flex items-center justify-center text-3xl">
            {/* {user.username.charAt(0).toUpperCase() || "U"} */}
            <img src={user.img} alt='user_img' className='w-20 h-20 rounded-full'/>
            </div>
            
            <h2 className="text-xl font-bold">{user.username}</h2>
            
            <button className="text-gray-600 hover:underline" onClick={()=>setEditPage(true)}>Edit profile</button>
          </div>

          {editPage && (
                  <div className="fixed inset-0 backdrop-blur-xl flex items-center justify-center">
                      <EditProfile user={user} onClose={() => setEditPage(false)}/>
                  </div>
                )}
        </div>
      );
}

export default Profile
