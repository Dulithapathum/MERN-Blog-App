import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

TimeAgo.addLocale(en);
const PostAuthor = ({ authorID, createdAt }) => {
  const [author, setAuthor] = useState([]);
  useEffect(() => {
    const getAuthor = async () => {
      try {
        const responce = await axios.get(
          ` http://localhost:3000/api/users/${authorID}`
        );
        setAuthor(responce?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAuthor();
  }, []);
  return (
    <Link to={`/posts/users/${authorID}`} className="flex items-center gap-2">
      <div className="w-10  ">
        <img
          src={`http://localhost:3000/upload/${author?.Avatar}`}
          alt="Avatar"
          className="w-full rounded-md  "
        />
      </div>
      <div>
        <h5 className="font-semibold">By: {author.name}</h5>
        <small className="text-sm text-gray-500">
          <ReactTimeAgo date={new Date(createdAt)} locale="en" />
        </small>
      </div>
    </Link>
  );
};

export default PostAuthor;
