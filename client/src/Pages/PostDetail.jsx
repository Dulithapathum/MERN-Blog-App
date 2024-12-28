import React, { useContext, useEffect, useState } from "react";
import PostAuthor from "../Components/PostAuthor";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../Context/userContext";
import DeletePost from "./DeletePost";
import axios from "axios";
const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/posts/${id}`
        );
        setPost(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    getPost();
  }, [id]);
  return (
    <div className=" w-full flex justify-center ]">
      {post && (
        <section className="max-w-[900px] bg-slate-200 rounded-md p-10 m-6">
          <div>
            <div className="flex justify-between items-center">
              <PostAuthor authorID={post.creator} createdAt={post.createdAt} />
              {currentUser?.id == post?.creator && (
                <div className="flex justify-center items-center">
                  <Link
                    className=" m-1 px-3 py-1 rounded-md bg-blue-700 text-white"
                    to={`/posts/${post._id}/edit`}
                  >
                    Edit
                  </Link>
                  <DeletePost postId={id} />
                </div>
              )}
            </div>
            <h1 className="text-3xl font-bold uppercase my-4">{post.title}</h1>
            <div>
              <img
                src={`http://localhost:3000/upload/${post.thumbnail}`}
                alt=""
                className="rounded-md"
              />
            </div>
            <p
              className="text-justify text-xl font-semibold mt-6 text-gray-800"
              dangerouslySetInnerHTML={{ __html: post.description }}
            ></p>
          </div>
        </section>
      )}
    </div>
  );
};

export default PostDetail;
