import React from "react";

const Profile = ({ user }) => {
  return (
    <div className="bg-primary-light min-h-screen flex items-center justify-center mt-20">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-sm w-full">
        <div className="flex flex-col items-center">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-primary-dark"
          />
          <h1 className="text-2xl font-bold text-primary-dark mt-4">
            {user.username}
          </h1>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
    </div>
  );
};
export default Profile;
