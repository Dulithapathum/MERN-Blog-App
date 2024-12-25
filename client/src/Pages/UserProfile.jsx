import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { authorsData } from "../assetes/data";
const UserProfile = () => {
  const [avatar, setAvatar] = useState(authorsData[1].avatar);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <section className="flex justify-center my-5 w-full ">
      <div className=" flex  flex-col  items-center w-full max-w-[800px] p-5 bg-blue-100 rounded-md">
        <Link
          to={`/myposts/sdvv`}
          className="bg-slate-500 px-4 py-1 rounded-md text-white  my-5"
        >
          My posts
        </Link>
        <div className="relative">
          <div className="w-48 h-48 mx-auto relative mb-4">
            <img
              src={avatar}
              alt="User Avatar"
              className="w-full h-full object-cover rounded-full border-4 border-blue-200"
            />

            <form
              action=""
              className="absolute bottom-2 right-2  bg-black/90 p-2 rounded-full"
            >
              <input
                type="file"
                name="avatar"
                id="avatar"
                onChange={(e) =>
                  setAvatar(URL.createObjectURL(e.target.files[0]))
                }
                accept="image/png, image/jpeg"
                className="hidden"
              />
              <label
                htmlFor="avatar"
                className="cursor-pointer text-white text-xl"
              >
                <FaEdit />
              </label>
            </form>
          </div>
          <h1 className="font-bold text-3xl text-center">Dulitha Pathum</h1>
          <form
            action=""
            className="w-full w-[500px] flex flex-col  items-center p-3  "
          >
            <p className="w-full p-2 m-2 rounded-md text-white  bg-red-600 ">
              This is an error
            </p>
            <input
              className="w-full p-2 m-2 rounded-md outline-none"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-full p-2 m-2 rounded-md outline-none"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full p-2 m-2 rounded-md outline-none"
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              className="w-full p-2 m-2 rounded-md outline-none"
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              className="w-full p-2 m-2 rounded-md outline-none"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              className="w-full p-3 m-2 rounded-md bg-blue-400 text-white"
              type="submit"
            >
              Update Details
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
