import React, { useEffect, useState } from "react";
import PostsItem from "./PostsItem";
import axios from "axios";
const Posts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const responce = await axios.get(" http://localhost:3000/api/posts");
        setPosts(responce?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);
  return (
    <>
      {posts.length > 0 ? (
        <div className=" max-w-[1200px] mx-6  lg:mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <PostsItem key={post._id} post={post} />
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

export default Posts;
