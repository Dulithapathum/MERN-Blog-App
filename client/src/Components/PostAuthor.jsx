import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../assetes/avatar1.jpg";
const PostAuthor = ({ authorID, createdAt }) => {
  return (
    <Link to={`posts/users/fbe`} className="flex items-center gap-2 ">
      <div className="w-10  ">
        <img src={Avatar} alt="Avatar" className="w-full rounded-md  " />
      </div>
      <div>
        <h5 className="font-semibold">By:Dulitha Pathum</h5>
        <small className="text-sm text-gray-500">Just Now</small>
      </div>
    </Link>
  );
};

export default PostAuthor;
