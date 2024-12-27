import React, { useContext, useEffect } from "react";
import { UserContext } from "../Context/userContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    setCurrentUser(null);
    navigate("/login");
  }, [setCurrentUser, navigate]);

  return <></>;
};

export default Logout;
