import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/userContext";
import axios from "axios";
const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);
  const changeInputHandler = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const userLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `http://localhost:3000/api/users/login`,
        userData
      );
      const User = response.data;
      setCurrentUser(User);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };
  return (
    <section className="flex justify-center items-center my-20">
      <div className="bg-white bg-opacity-50 backdrop-blur-md p-10 w-full max-w-[500px] rounded-md m-5 flex flex-col justify-center items-center ">
        <h2 className="text-center font-bold text-3xl mb-4">Sign In</h2>
        <form
          className="flex flex-col items-center w-full"
          onSubmit={userLogin}
        >
          {error && (
            <p className="w-full  p-1 text-white  bg-red-600 rounded-md m-1 mt-8">
              {error}
            </p>
          )}

          <input
            type="text"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={changeInputHandler}
            className="w-full  p-2 m-2 rounded-md outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={changeInputHandler}
            className="w-full  p-2 m-2 rounded-md outline-none"
          />

          <button
            type="submit"
            className="p-2 m-2 bg-blue-500 hover:bg-blue-600 transition-colors text-white w-full max-w-[400px]  rounded-md"
          >
            Login
          </button>
          <small className="text-lg">
            Don't have an account ?{" "}
            <Link to="/register" className="text-blue-500 hover:text-blue-600">
              Register
            </Link>
          </small>
        </form>
      </div>
    </section>
  );
};

export default Login;
