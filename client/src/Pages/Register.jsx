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
    <section>
      <div>
        <h2>Sign Up</h2>
        <form action="">
          <p>This is error message</p>
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={userData.name}
            onChange={changeInputHandler}
            autoFocus
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={changeInputHandler}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={changeInputHandler}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="password"
            value={userData.password2}
            onChange={changeInputHandler}
          />
          <button type="submit">Register</button>
          <small>
            Alredy have an account ? <Link to="/login">Sign In</Link>
          </small>
        </form>
      </div>
    </section>
  );
};

export default Register;
