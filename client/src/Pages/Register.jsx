import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const changeInputHandler = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `http://localhost:3000/api/users/register`,
        userData
      );
      const newUser = response.data;

      if (!newUser) {
        setError("Couldn't register user");
      } else {
        navigate("/login");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          (err.request
            ? "No response from server."
            : "An unexpected error occurred.")
      );
    }
  };

  return (
    <section className="flex justify-center items-center">
      <div className="bg-white bg-opacity-50 backdrop-blur-md p-10 w-full max-w-[500px] rounded-md m-5 flex flex-col justify-center items-center">
        <h2 className="text-center font-bold text-3xl mb-4">Sign Up</h2>
        <form
          className="flex flex-col items-center w-full"
          onSubmit={registerUser}
        >
          {error && (
            <p className="w-full p-1 text-white bg-red-600 rounded-md m-1 mt-8">
              {error}
            </p>
          )}
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={userData.name}
            onChange={changeInputHandler}
            autoFocus
            className="w-full p-2 m-2 rounded-md outline-none"
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={changeInputHandler}
            className="w-full p-2 m-2 rounded-md outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={changeInputHandler}
            className="w-full p-2 m-2 rounded-md outline-none"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={userData.password2}
            onChange={changeInputHandler}
            className="w-full p-2 m-2 rounded-md outline-none"
          />
          <button
            type="submit"
            className="p-2 m-2 bg-blue-500 hover:bg-blue-600 transition-colors text-white w-full max-w-[400px] rounded-md"
          >
            Register
          </button>
          <small className="text-lg">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:text-blue-600">
              Sign In
            </Link>
          </small>
        </form>
      </div>
    </section>
  );
};

export default Register;
