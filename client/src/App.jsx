import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import ErrorPage from "./Pages/ErrorPage";
import Home from "./Pages/Home";
import PostDetail from "./Pages/PostDetail";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import UserProfile from "./Pages/UserProfile";
import Authors from "./Pages/Authors";
import CreatePost from "./Pages/CreatePost";
import CategoryPosts from "./Pages/CategoryPosts";
import AuthorPosts from "./Pages/AuthorPosts";
import Dashboard from "./Pages/Dashboard";
import EditPost from "./Pages/EditPost";
import Logout from "./Pages/Logout";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="posts/:id" element={<PostDetail />} />
          </Route>
          <Route path="register" element={<Register />} />{" "}
          {/* Corrected spelling */}
          <Route path="login" element={<Login />} />
          <Route path="profile/:id" element={<UserProfile />} />
          <Route path="authors" element={<Authors />} />
          <Route path="create" element={<CreatePost />} />{" "}
          {/* Corrected name */}
          <Route
            path="posts/categories/:category"
            element={<CategoryPosts />}
          />
          <Route path="posts/users/:id" element={<AuthorPosts />} />
          <Route path="myposts/:id" element={<Dashboard />} />{" "}
          {/* Corrected path */}
          <Route path="posts/:id/edit" element={<EditPost />} />
          <Route path="logout" element={<Logout />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
