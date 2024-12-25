import React, { useState } from "react";
import { Link } from "react-router-dom";
const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const changeInputHandler = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  return (
    <section className="flex justify-center items-center">
      <div className="bg-slate-200 p-10 w-full max-w-[500px] rounded-md m-5 flex flex-col justify-center items-center ">
        <h2 className="text-center font-bold text-3xl">Sign Up</h2>
        <form action="" className="flex flex-col items-center w-full">
          <p className="w-full  p-1 text-white  bg-red-600 rounded-md m-1 mt-8">
            This is error message
          </p>
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
          <input
            type="password"
            placeholder="Confirm Password"
            name="password"
            value={userData.password2}
            onChange={changeInputHandler}
            className="w-full  p-2 m-2 rounded-md outline-none"
          />
          <button
            type="submit"
            className="p-2 m-2 bg-slate-300 w-full max-w-[400px]  rounded-md"
          >
            Register
          </button>
          <small className="text-lg">
            Alredy have an account ?{" "}
            <Link to="/login" className="text-blue-500">
              Sign In
            </Link>
          </small>
        </form>
      </div>
    </section>
  );
};

export default Register;
