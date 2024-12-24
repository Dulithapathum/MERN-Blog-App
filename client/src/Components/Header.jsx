import React, { useState } from "react";
import logo from "../assetes/logo.png";
import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className=" sticky top-0  flex items-center bg-slate-100 justify-center  shadow-md ">
      <div className="flex justify-between items-center w-full max-w-[1200px] px-5 ">
        <Link to="/">
          <img src={logo} alt="logo" className="w-20" />
        </Link>
        <ul className="hidden md:flex gap-8 font-semibold capitalize">
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

        <button
          className="md:hidden text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-slate-100 md:hidden shadow-md">
          <ul className="flex flex-col items-center gap-6 py-6 font-semibold capitalize">
            <li>
              <Link to="profile" onClick={() => setIsMenuOpen(false)}>
                Dulitha Pathum
              </Link>
            </li>
            <li>
              <Link to="create" onClick={() => setIsMenuOpen(false)}>
                Create Post
              </Link>
            </li>
            <li>
              <Link to="authors" onClick={() => setIsMenuOpen(false)}>
                Authors
              </Link>
            </li>
            <li>
              <Link to="logout" onClick={() => setIsMenuOpen(false)}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Header;
