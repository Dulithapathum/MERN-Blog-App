import { HttpError } from "../models/errorModel.js";
import bcryptjs from "bcryptjs";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
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
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new HttpError("Fill In All Fields", 422));
    }
    const newEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: newEmail });
    if (!user) {
      return next(new HttpError("Invalid credentials", 422));
    }

    const comparePass = await bcryptjs.compare(password, user.password);
    if (!comparePass) {
      return next(new HttpError("Invalid credentials", 422));
    }

    const { _id: id, name } = user;
    const token = jwt.sign({ id, name }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ token, id, name });
  } catch (error) {
    next(new HttpError("User Login Failed", 422));
  }
};

// ===================User Profile===================
// POST:api/users/:id
// PROTECTED
export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return next(new HttpError("User Not Found", 404));
    }
    res.status(200).json(user);
  } catch (error) {
    next(new HttpError(error));
  }
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
  try {
    const author = await User.find().select("-password");
    res.status(200).json(author);
  } catch (error) {
    next(new HttpError(error));
  }
};
