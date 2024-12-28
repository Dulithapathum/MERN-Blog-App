import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/userContext";
import axios from "axios";

const DeletePost = ({ postID, onDelete }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const deletePost = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/posts/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      if (response.status === 200) {
        if (onDelete) {
          onDelete(id);
        } else if (location.pathname === `/posts/${id}`) {
          navigate("/");
        } else {
          window.location.reload();
        }
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  return (
    <button
      className="m-1 px-3 py-1 rounded-md bg-red-700 text-white"
      onClick={() => {
        if (window.confirm('Are you sure you want to delete this post?')) {
          deletePost(postID);
        }
      }}
    >
      Delete
    </button>
  );
};

export default DeletePost;
