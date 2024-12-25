import React, { useState } from "react";
import { authorsData } from "../assetes/data";
import { Link } from "react-router-dom";
const Authors = () => {
  const [authors, setAuthors] = useState(authorsData);
  return (
    <section className="grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-[1200px] mx-auto mt-20 mb-44  ">
      {authors.length > 0 ? (
        authors.map(({ id, avatar, name, posts }) => (
          <Link
            key={id}
            to={`/posts/users/${id}`}
            className="flex justify-center items-center gap-4 m-3 p-2 bg-slate-400 rounded-md hover:shadow-lg"
          >
            <div>
              <img
                src={avatar}
                alt={name}
                className="w-14 h-14 rounded-full bg-cover"
              />
            </div>
            <div>
              <h4 className="font-bold capitalize">{name}</h4>
              <p className="text-gray-800">{posts} Posts</p>
            </div>
          </Link>
        ))
      ) : (
        <h1 className="text-center text-3xl font-bold my-52">
          No Authors Found
        </h1>
      )}
    </section>
  );
};

export default Authors;
