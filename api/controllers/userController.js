// api/controllers/userController.js
import express from "express";
import errorHandler from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from "../models/userModel.js";

const test = async (req, res) => {
  res.json({ message: "API is working fine" });
};

// Update User
const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only update your own account!"));
  }

  try {
    let updatedData = {
      userName: req.body.userName,
      userEmail: req.body.userEmail,
      userProfilePic: req.body.userProfilePic,
    };

    // If the user is updating their password, hash it
    if (req.body.userPassword) {
      const hashedPassword = await bcryptjs.hash(req.body.userPassword, 10);
      updatedData.userPassword = hashedPassword; // Only add hashed password
    }

    // Update user with the appropriate fields
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updatedData },
      { new: true }
    );

    if (!updatedUser) {
      return next(errorHandler(404, "User not found!"));
    }

    // Return the updated user without the password field
    const { userPassword, ...others } = updatedUser._doc;
    res.status(200).json(others);
  } catch (error) {
    next(error);
  }
};

// Delete User
const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only delete your own account!"));
  }

  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json("User has been deleted...");
  } catch (error) {
    next(error);
  }
};

export { test, updateUser, deleteUser };
