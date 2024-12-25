import React from "react";
import { Link } from "react-router-dom";
const ErrorPage = () => {
  return (
    <>
      <div className="flex  flex-col items-center mt-60">
        <h1 className="text-3xl md:text-6xl  font-bold">Page Not Found</h1>
        <Link to="/">
          <button className=" bg-black text-white px-4 py-1 m-6 rounded-lg font-bold">
            Goto Home{" "}
          </button>
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
