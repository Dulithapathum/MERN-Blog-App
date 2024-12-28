import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="flex  flex-col min-h-44 p-3 justify-evenly items-center bg-black">
      <ul className="flex items-center justify-center flex-wrap gap-5">
        <li className="bg-slate-700 text-white px-3 py-1 rounded-md hover:bg-white hover:text-black transition-colors">
          <Link to="posts/categories/Technology">Technology</Link>
        </li>
        <li className="bg-slate-700 text-white px-3 py-1 rounded-md hover:bg-white hover:text-black transition-colors">
          <Link to="posts/categories/Education">Education</Link>
        </li>
        <li className="bg-slate-700 text-white px-3 py-1 rounded-md hover:bg-white hover:text-black transition-colors">
          <Link to="posts/categories/Health">Health</Link>
        </li>
        <li className="bg-slate-700 text-white px-3 py-1 rounded-md hover:bg-white hover:text-black transition-colors">
          <Link to="posts/categories/Travel">Travel</Link>
        </li>
        <li className="bg-slate-700 text-white px-3 py-1 rounded-md hover:bg-white hover:text-black transition-colors">
          <Link to="posts/categories/Lifestyle">Lifestyle</Link>
        </li>
      </ul>
      <div className="w-full flex flex-col items-center ">
        <hr className=" bg-white w-full" />
        <div className="">
          <small className="text-slate-100 font-semibold">
            All Right Reserved &copy; Copyright by Dulitha Pathum
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
