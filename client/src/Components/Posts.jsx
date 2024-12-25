import React, { useState } from "react";
import PostsItem from "./PostsItem";
import { DUMMY_POSTS } from "../assetes/data";
const Posts = () => {
  const [posts, setPosts] = useState(DUMMY_POSTS);
  return (
    <div className=" max-w-[1200px] mx-6  lg:mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <PostsItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
