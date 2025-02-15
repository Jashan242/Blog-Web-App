import React from "react";

function UserDtls({user}) {

  console.log(user);
  return (
    <div className="flex flex-col mt-20 items-center min-h-screen">
      <div className="bg-white flex shadow-lg rounded-lg p-6 md:w-1/3 lg:w-1/2 text-center">
        <div className="flex justify-center">
        {
            user.img && (
              <img
                src={user.img}
                alt="User"
                className="w-16 h-16 md:w-16 md:h-16 rounded-full shadow-lg outline-none object-cover"
              />
            )
          || (
            <div className="w-12 h-12 md:w-32 md:h-32 rounded-full border-4 border-green-500">{user.username.charAt(0).toUpperCase()}</div>
          )
        }
         
        </div>

        <div>
          <h1 className="text-2xl font-semibold text-gray-800 mt-4">
            {user.username}
          </h1>
          <p className="text-lg text-gray-600">
            {user.firstname} {user.lastname}
          </p>
          <p className="text-gray-500">{user.email}</p>
          {user.bio && (
            <p className="mt-4 text-gray-700 md:px-4">{user.bio}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDtls;
