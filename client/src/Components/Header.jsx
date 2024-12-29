import React, { useContext, useState } from "react";
import logo from "../assetes/logo.png";
import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { UserContext } from "../Context/userContext";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser } = useContext(UserContext);
  return (
    <>
      {currentUser?.id && (
        <nav className=" sticky top-0 z-50  flex items-center bg-slate-100 justify-center  shadow-md ">
          {
            <div className="flex justify-between items-center w-full max-w-[1200px] px-5 ">
              <Link to="/">
                <img src={logo} alt="logo" className="w-20" />
              </Link>
              <ul className="hidden md:flex gap-8 font-semibold capitalize ">
                <li>
                  <Link
                    to={`profile/${currentUser.id}`}
                    className="hover:text-blue-500 transition-colors "
                  >
                    {currentUser?.name}
                  </Link>
                </li>
                <li>
                  <Link
                    to="create"
                    className="hover:text-blue-500 transition-colors "
                  >
                    Create Post
                  </Link>
                </li>
                <li>
                  <Link
                    to="authors"
                    className="hover:text-blue-500 transition-colors "
                  >
                    Authors
                  </Link>
                </li>
                <li>
                  <Link
                    to="logout"
                    className="hover:text-blue-500 transition-colors "
                  >
                    Logout
                  </Link>
                </li>
              </ul>

              <button
                className="md:hidden text-2xl"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
              </button>
            </div>
          }

          {isMenuOpen && (
            <div className="absolute top-20 left-0 w-full bg-slate-100 md:hidden shadow-md">
              <ul className="flex flex-col items-center gap-6 py-6 font-semibold capitalize">
                <li>
                  <Link
                    to={`profile/${currentUser.id}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:text-blue-500 transition-colors "
                  >
                    {currentUser?.name}
                  </Link>
                </li>
                <li>
                  <Link
                    to="create"
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:text-blue-500 transition-colors "
                  >
                    Create Post
                  </Link>
                </li>
                <li>
                  <Link
                    to="authors"
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:text-blue-500 transition-colors "
                  >
                    Authors
                  </Link>
                </li>
                <li>
                  <Link
                    to="logout"
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:text-blue-500 transition-colors "
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </nav>
      )}
      {!currentUser?.id && (
        <nav className=" sticky top-0 z-50  flex items-center bg-slate-100 justify-center  shadow-md ">
          {
            <div className="flex justify-between items-center w-full max-w-[1200px] px-5 ">
              <Link to="/" className="hover:text-[#87CEEB] transition-colors ">
                <img src={logo} alt="logo" className="w-20" />
              </Link>
              <ul className="hidden md:flex gap-8 font-semibold capitalize">
                <li>
                  <Link
                    to="authors"
                    className="hover:text-blue-500 transition-colors "
                  >
                    Authors
                  </Link>
                </li>
                <li>
                  <Link
                    to="login"
                    className="hover:text-blue-500 transition-colors "
                  >
                    Login
                  </Link>
                </li>
              </ul>

              <button
                className="md:hidden text-2xl"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
              </button>
            </div>
          }

          {isMenuOpen && (
            <div className="absolute top-20 left-0 w-full bg-slate-100 md:hidden shadow-md">
              <ul className="flex flex-col items-center gap-6 py-6 font-semibold capitalize">
                <li>
                  <Link
                    to="authors"
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:text-blue-500 transition-colors "
                  >
                    Authors
                  </Link>
                </li>
                <li>
                  <Link
                    to="login"
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:text-blue-500 transition-colors "
                  >
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </nav>
      )}
    </>
  );
};

export default Header;
