import React from "react";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";
const PostsItem = ({ post }) => {
  return (
    <article>
      <div>
        <img src={post.thumbnail} alt={post.title} />
      </div>
      <div>
        <Link to={`/posts/${post.id}`}>
          <h3>{post.title}</h3>
        </Link>
        <p>{post.disc}</p>
        <div>
          <PostAuthor />
          <Link to={`/posts/categories/${post.category}`}>{post.category}</Link>
        </div>
      </div>
    </article>
  );
};

export default PostsItem;
