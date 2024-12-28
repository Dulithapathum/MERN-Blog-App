import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/userContext";
import DeletePost from "../Pages/DeletePost";
import axios from "axios";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/posts/users/${currentUser.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPosts(response.data);
      } catch (err) {
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUserPosts();
    }
  }, [currentUser.id, token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {posts.length > 0 ? (
        <div>
          {posts.map((post) => (
            <article
              key={post._id}
              className="flex justify-between p-3 rounded-md bg-slate-100 mx-auto items-center max-w-[1200px] my-3"
            >
              <div className="flex gap-5 items-center">
                <div className="w-16 ">
                  <img
                    src={`http://localhost:3000/upload/${post.thumbnail}`}
                    alt={post.title}
                    className="rounded-md"
                  />
                </div>
                <h5 className="font-semibold text-lg">{post.title}</h5>
              </div>
              <div className="flex justify-evenly max-w-60 w-full">
                <Link
                  className="bg-slate-200 h-8 px-4 rounded-md py-1"
                  to={`/posts/${post._id}`}
                >
                  View
                </Link>
                <Link
                  className="bg-slate-200 h-8 px-4 rounded-md py-1 bg-blue-500"
                  to={`/posts/${post._id}/edit`}
                >
                  Edit
                </Link>
                <DeletePost
                  postID={post._id}
                  onDelete={() => {
                    setPosts(posts.filter((p) => p._id !== post._id));
                  }}
                />
              </div>
            </article>
          ))}
        </div>
      ) : (
        <h1 className="text-center text-3xl font-bold my-52">
          You have no posts yet.
        </h1>
      )}
    </div>
  );
};

export default Dashboard;
