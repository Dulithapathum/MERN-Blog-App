import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../Components/Loading";
import axios from "axios";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAuthors = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users");
        setAuthors(response?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getAuthors();
  }, []);

  if (loading) return <Loading />;

  return (
    <section className="grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-[1200px] mx-auto mt-20 mb-44  ">
      {authors.length > 0 ? (
        authors.map(({ _id, avatar, name, posts }) => (
          <Link
            key={_id}
            to={`/posts/users/${_id}`}
            className="flex justify-center items-center gap-4 m-3 p-5 hover:text-blue-600 bg-white bg-opacity-50 backdrop-blur-md rounded-md hover:shadow-lg transition-colors"
          >
            <div>
              <img
                src={`http://localhost:3000/upload/${avatar}`}
                alt={name}
                className="w-16 h-16 rounded-full bg-cover"
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
