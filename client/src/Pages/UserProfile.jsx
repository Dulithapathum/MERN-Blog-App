import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { authorsData } from "../assetes/data";
import { UserContext } from "../Context/userContext";
import axios from "axios";

const UserProfile = () => {
  const [avatar, setAvatar] = useState(authorsData[1].avatar);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchUserData();
    }
  }, [token, navigate]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/users/${currentUser.id}`
      );
      const userData = response.data;
      setName(userData.name);
      setEmail(userData.email);
      if (userData.avatar) {
        setAvatar(`http://localhost:3000/upload/${userData.avatar}`);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch user data");
    }
  };

  // Handle avatar change
  const changeAvatarHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("avatar", e.target.files[0]);

      const response = await axios.post(
        `http://localhost:3000/api/users/change-avatar`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.user.avatar) {
        setAvatar(`http://localhost:3000/upload/${response.data.user.avatar}`);
        setSuccess("Avatar updated successfully");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Couldn't update avatar");
    }
  };

  // Handle form submission
  const updateUserHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/users/edit-user`,
        {
          name,
          email,
          currentPassword,
          newPassword,
          confirmNewPassword: confirmPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setError("");
      // Clear password fields after successful update
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setError(error.response?.data?.message || "Couldn't update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex justify-center my-5 w-full ">
      <div className=" flex  flex-col  items-center w-full max-w-[800px] p-5 bg-blue-100 rounded-md">
        <Link
          to={`/myposts/${currentUser.id}`}
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
                onChange={changeAvatarHandler}
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
            onSubmit={updateUserHandler}
            className="w-full w-[500px] flex flex-col items-center p-3"
          >
            {error && (
              <p className="w-full p-2 m-2 rounded-md text-white bg-red-600">
                {error}
              </p>
            )}
            {success && (
              <p className="w-full p-2 m-2 rounded-md text-white bg-green-600">
                {success}
              </p>
            )}
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
              disabled={isLoading}
              className="w-full p-3 m-2 rounded-md bg-blue-400 text-white disabled:opacity-75"
              type="submit"
            >
              {isLoading ? "Updating..." : "Update Details"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
