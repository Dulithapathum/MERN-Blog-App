import React, { useState } from "react";
import { DUMMY_POSTS } from "../assetes/data";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const [posts, setPosts] = useState(DUMMY_POSTS);
  return (
    <div>
      {posts.length > 0 ? (
        <div>
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex justify-between p-3 rounded-md bg-slate-100 mx-auto items-center max-w-[1200px] my-3"
            >
              <div className="flex gap-5 items-center">
                <div className="w-16 ">
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="rounded-md"
                  />
                </div>
                <h5 className="font-semibold text-lg"> {post.title}</h5>
              </div>
              <div className="flex justify-evenly max-w-60 w-full">
                <Link
                  className="bg-slate-200 h-8  px-4 rounded-md py-1 "
                  to={`/posts/${post.id}`}
                >
                  View
                </Link>
                <Link
                  className="bg-slate-200  h-8  px-4 rounded-md py-1  bg-blue-500"
                  to={`/posts/${post.id}/edit`}
                >
                  Edit
                </Link>
                <Link
                  className="bg-slate-200 h-8  px-4 rounded-md py-1 bg-red-500  "
                  to={`/posts/${post.id}/delete`}
                >
                  Delete
                </Link>
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
