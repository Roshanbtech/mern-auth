import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="bg-gradient-to-r from-black to-gray-800 min-h-screen flex items-center justify-center pt-24">
      {/* Centered layout with reduced size */}
      <div className="p-6 max-w-sm w-full bg-gray-900 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-blue-400 mb-4">
          Profile
        </h1>
        <form className="flex flex-col gap-3">
          <input type="file" hidden accept="image/*" />

          <img
            src={currentUser?.userProfilePic}
            alt="profile"
            className="h-20 w-20 self-center cursor-pointer rounded-full object-cover mt-2"
          />

          <p className="text-sm self-center text-gray-300">
            {/* Display error, upload status, or success messages */}
          </p>

          <input
            type="text"
            id="userName"
            placeholder="Username"
            className="bg-gray-700 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          />

          <input
            type="email"
            id="userEmail"
            placeholder="Email"
            className="bg-gray-700 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          />

          <input
            type="password"
            id="userPassword"
            placeholder="Password"
            className="bg-gray-700 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          />

          <button className="bg-gradient-to-r from-blue-500 to-white-400 text-white p-2 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 transition duration-300">
            Update
          </button>
        </form>

        <div className="flex justify-between mt-4">
          <span className="text-red-700 cursor-pointer hover:underline">
            Delete Account
          </span>
          <span className="text-red-700 cursor-pointer hover:underline">
            Sign out
          </span>
        </div>

        <p className="text-red-700 mt-4">{/* Error message */}</p>
        <p className="text-green-700 mt-4">{/* Success message */}</p>
      </div>
    </div>
  );
};

export default Profile;
