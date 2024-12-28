import { HttpError } from "../models/errorModel.js";
import bcryptjs from "bcryptjs";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";
import { fileURLToPath } from "url";
import { mkdir } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  try {
    if (!req.files || !req.files.avatar) {
      return next(new HttpError("Please choose an image", 422));
    }

    // Ensure upload directory exists
    const uploadDir = path.join(__dirname, "..", "upload");
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (err) {
      if (err.code !== 'EEXIST') {
        return next(new HttpError("Couldn't create upload directory", 500));
      }
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new HttpError("User Not Found", 404));
    }

    // Delete old avatar if exists
    if (user.avatar) {
      const oldAvatarPath = path.join(__dirname, "..", "upload", user.avatar);
      try {
        await fs.promises.unlink(oldAvatarPath);
      } catch (error) {
        console.log("Old avatar not found or couldn't be deleted");
      }
    }

    const { avatar } = req.files;
    if (avatar.size > 500000) {
      return next(
        new HttpError("Profile Picture too big. Should be less than 500KB", 422)
      );
    }

    let filename = avatar.name;
    let splittedFilename = filename.split(".");
    let newFilename =
      splittedFilename[0] +
      uuid() +
      "." +
      splittedFilename[splittedFilename.length - 1];

    avatar.mv(
      path.join(__dirname, "..", "upload", newFilename),
      async (err) => {
        if (err) {
          return next(new HttpError("Avatar couldn't be changed", 422));
        }

        user.avatar = newFilename;
        await user.save();

        // Return full user object with avatar URL
        const userResponse = user.toObject();
        userResponse.avatarUrl = `http://localhost:3000/upload/${newFilename}`;

        res.status(200).json({ user: userResponse });
      }
    );
  } catch (error) {
    next(new HttpError(error));
  }
};

// ===================Edit User Details===================
// POST:api/users/edit-user
// PROTECTED
export const editUser = async (req, res, next) => {
  try {
    const { name, email, currentPassword, newPassword, confirmNewPassword } =
      req.body;
    if (!name || !email || !currentPassword || !newPassword) {
      return next(new HttpError("Fill In All Fields", 422));
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new HttpError("User not found", 403));
    }

    const emailExist = await User.findOne({ email });
    if (emailExist && emailExist._id != req.user.id) {
      return next(new HttpError("Email already exists", 422));
    }

    const validateUserPassword = await bcryptjs.compare(
      currentPassword,
      user.password
    );
    if (!validateUserPassword) {
      return next(new HttpError("Current password is incorrect", 422));
    }

    if (newPassword !== confirmNewPassword) {
      return next(new HttpError("New passwords do not match", 422));
    }

    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(newPassword, salt);

    user.name = name;
    user.email = email;
    user.password = hash;
    await user.save();

    res.status(200).json({ message: "User details updated successfully" });
  } catch (error) {
    next(new HttpError(error));
  }
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
