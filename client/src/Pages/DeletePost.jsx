import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/userContext";

const DeletePost = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);
  return (
    <div>
      {" "}
      <Link
        className=" m-1 px-3 py-1 rounded-md bg-red-700 text-white"
        to={`/posts/werwer/delete`}
      >
        Delete
      </Link>
    </div>
  );
};

export default DeletePost;
