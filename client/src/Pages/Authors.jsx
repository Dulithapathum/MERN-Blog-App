import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const Authors = () => {
  const [authors, setAuthors] = useState([]);
  useEffect(() => {
    const getAuthors = async () => {
      const responce = await axios.get(`http://localhost:3000/api/users/`);
      setAuthors(responce.data);
    };
    getAuthors();
  }, []);
  return (
    <section className="grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-[1200px] mx-auto mt-20 mb-44  ">
      {authors.length > 0 ? (
        authors.map(({ _id, avatar, name, posts }) => (
          <Link
            key={_id}
            to={`/posts/users/${_id}`}
            className="flex justify-center items-center gap-4 m-3 p-2 bg-slate-400 rounded-md hover:shadow-lg"
          >
            <div>
              <img
                src={`http://localhost:3000/upload/${avatar}`}
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
        <h1 className="text-center text-3xl font-bold my-32">
          No Authors Found
        </h1>
      )}
    </section>
  );
};

export default Authors;
