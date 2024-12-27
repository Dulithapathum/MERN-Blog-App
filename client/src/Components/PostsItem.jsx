import React from "react";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";
const PostsItem = ({ post }) => {
  const truncateText = (text, limit) => {
    const words = text.split(" ");
    return words.length > limit
      ? words.slice(0, limit).join(" ") + "..."
      : text;
  };

  return (
    <article className="my-3 bg-slate-200 p-4 rounded-lg flex  flex-col justify-start hover:shadow-lg transition-shadow">
      <div className="">
        <img
          className="w-full h-56 bg-cover rounded-lg"
          src={`http://localhost:3000/upload/${post.thumbnail}`}
          alt={post.title}
        />
      </div>
      <div>
        <Link to={`/posts/${post.id}`}>
          <h3 className="font-bold text-xl capitalize">{post.title}</h3>
        </Link>
        <p className="my-2 text-gray-700">
          {" "}
          {truncateText(post.description, 20)}
        </p>
        <div className="flex  justify-between items-center">
          <PostAuthor authorID={post.creator} createdAt={post.createdAt} />
          <Link
            to={`/posts/categories/${post.category}`}
            className="bg-blue-200 px-2 py-1 rounded-md text-blue-700 capitalize"
          >
            {post.category}
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostsItem;
