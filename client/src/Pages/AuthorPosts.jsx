import React, { useEffect, useState } from "react";
import PostsItem from "../Components/PostsItem";
import Loading from "../Components/Loading";
import axios from "axios";
import { useParams } from "react-router-dom";

const AuthorPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/posts/users/${id}`
        );
        setPosts(response?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [id]);

  if (loading) return <Loading />;

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

export default AuthorPosts;
