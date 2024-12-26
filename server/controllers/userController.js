import { HttpError } from "../models/errorModel.js";
import bcryptjs from "bcryptjs";
import User from "../models/userModel.js";
// ===================Register User===================
// POST:api/users/register
// UNPROTECTED
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, password2 } = req.body;
    if (!name || !email || !password || !password2) {
      return next(new HttpError("Fill In All Fields", 422));
    }
    const newEmail = email.trim().toLowerCase();
    const emailExists = await User.findOne({ email: newEmail });
    if (emailExists) {
      return next(new HttpError("Email already exists", 422));
    }

    if (password.trim().length < 6) {
      return next(
        new HttpError("Password should be at least 6 characters", 422)
      );
    }
    if (password != password2) {
      return next(new HttpError("Password do not match", 422));
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPass = await bcryptjs.hash(password, salt);
    const newUser = await User.create({
      name,
      email: newEmail,
      password: hashedPass,
    });
    res.status(201).json(`New User ${newUser.email} Register`);
  } catch (error) {
    next(new HttpError("User Registation Failed", 422));
  }
};

// ===================Login User===================
// POST:api/users/login
// UNPROTECTED
export const loginUser = async (req, res, next) => {
  res.json("Login User");
};

// ===================User Profile===================
// POST:api/users/:id
// PROTECTED
export const getUser = async (req, res, next) => {
  res.json("User Profile");
};

// ===================Change User Avatar===================
// POST:api/users/change-avatar
// PROTECTED
export const changeAvatar = async (req, res, next) => {
  res.json("Change User Avatar");
};

// ===================Edit User Details===================
// POST:api/users/edit-user
// PROTECTED
export const editUser = async (req, res, next) => {
  res.json("Edit User Detail");
};

// ===================Get Authors===================
// POST:api/users/authors
// UNPROTECTED
export const getAuthors = async (req, res, next) => {
  res.json("Get All Authors");
};
