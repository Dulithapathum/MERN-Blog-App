import React, { useState } from "react";
import { Link } from "react-router-dom";
const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const changeInputHandler = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  return (
    <section className="flex justify-center items-center mb-8">
      <div className="bg-slate-200 p-10 w-full max-w-[500px] rounded-md m-5 flex flex-col justify-center items-center ">
        <h2 className="text-center font-bold text-3xl">Sign In</h2>
        <form action="" className="flex flex-col items-center w-full">
          <p className="w-full  p-1 text-white  bg-red-600 rounded-md m-1 mt-8">
            This is error message
          </p>

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
            className="p-2 m-2 bg-slate-300 w-full max-w-[400px]  rounded-md"
          >
            Login
          </button>
          <small className="text-lg">
            Don't have an account ?{" "}
            <Link to="/register" className="text-blue-500">
              Register
            </Link>
          </small>
        </form>
      </div>
    </section>
  );
};

export default Login;
