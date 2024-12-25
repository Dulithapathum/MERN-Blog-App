import React, { useState } from "react";
import PostsItem from "../Components/PostsItem";
import { DUMMY_POSTS } from "../assetes/data";
const AuthorPosts = () => {
  const [posts, setPosts] = useState(DUMMY_POSTS);

  return (
    <>
      {posts.length > 0 ? (
        <div className=" max-w-[1200px] mx-6  lg:mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <PostsItem key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div>
          <h1 className="text-center text-3xl font-bold my-52">
            No Post Found
          </h1>
        </div>
      )}
    </>
  );
};

export default AuthorPosts;
