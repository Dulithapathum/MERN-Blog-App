import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

TimeAgo.addLocale(en);
const PostAuthor = ({ authorID, createdAt }) => {
  const [author, setAuthor] = useState({});

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/users/${authorID}`
        );
        setAuthor(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAuthor();
  }, [authorID]);

  return (
    <Link to={`/posts/users/${authorID}`} className="flex items-center gap-2">
      <div className="w-10">
        <img
          src={
            author?.avatar
              ? `http://localhost:3000/upload/${author.avatar}`
              : "/default-avatar.png"
          }
          alt={author?.name || "Author"}
          className="w-full rounded-md "
        />
      </div>
      <div>
        <h5 className="font-semibold text-gray-700 hover:text-blue-600 transition-colors">
          By: {author?.name}
        </h5>
        <small className="text-sm text-gray-500">
          <ReactTimeAgo date={new Date(createdAt)} locale="en" />
        </small>
      </div>
    </Link>
  );
};

export default PostAuthor;
