import React from "react";
import logo from "../assetes/logo.png";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
const Header = () => {
  return (
    <nav>
      <div className="">
        <Link to="/" className="">
          <img src={logo} alt="logo" className="" />
        </Link>
        <ul className="">
          <li>
            <Link to="profile">Dulitha Pathum</Link>
          </li>
          <li>
            <Link to="create">Create Post</Link>
          </li>
          <li>
            <Link to="authors">Authors</Link>
          </li>
          <li>
            <Link to="logout">Logout</Link>
          </li>
        </ul>
        <button className="">
          <AiOutlineClose />
        </button>
      </div>
    </nav>
  );
};

export default Header;
