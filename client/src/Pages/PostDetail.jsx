import React, { useContext, useEffect, useState } from "react";
import PostAuthor from "../Components/PostAuthor";
import { Link, useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/userContext";
import DeletePost from "./DeletePost";
import axios from "axios";
import Loading from "../Components/Loading";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/posts/${id}`
        );
        setPost(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch post");
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    getPost();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div className="w-full flex justify-center">
      <section className="max-w-[900px] bg-white bg-opacity-50 backdrop-blur-md rounded-md p-10 m-6">
        <div>
          <div className="flex justify-between items-center">
            <PostAuthor authorID={post.creator} createdAt={post.createdAt} />
            {currentUser?.id === post?.creator && (
              <div className="flex justify-center items-center">
                <Link
                  className="m-1 px-3 py-1 rounded-md bg-blue-500 hover:bg-blue-600 transition-colors text-white"
                  to={`/posts/${post._id}/edit`}
                >
                  Edit
                </Link>
                <DeletePost postID={id} onDelete={() => navigate("/")} />
              </div>
            )}
          </div>
          <h1 className="text-4xl mt-10 font-bold uppercase my-4 text-center">
            {post.title}
          </h1>
          <div className="flex justify-center">
            <img
              src={`http://localhost:3000/upload/${post.thumbnail}`}
              alt={post.title}
              className="rounded-md"
            />
          </div>
          <p
            className="text-justify text-2xl font-semibold mt-6 text-gray-900"
            dangerouslySetInnerHTML={{ __html: post.description }}
          ></p>
        </div>
      </section>
    </div>
  );
};

export default PostDetail;
