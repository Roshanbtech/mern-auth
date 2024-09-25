// import express from "express";
import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import errorHandler from "../utils/error.js"; // Correct import
import jwt from "jsonwebtoken";

const signUp = async (req, res, next) => {
  try {
    const { userName, userEmail, userPassword } = req.body;
    const hashedPassword = await bcryptjs.hash(userPassword, 10);
    const newUser = new User({
      userName,
      userEmail,
      userPassword: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  const { userEmail, userPassword } = req.body;
  try {
    const validUser = await User.findOne({ userEmail });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = await bcryptjs.compare(
      userPassword,
      validUser.userPassword
    );
    if (!validPassword) return next(errorHandler(401, "wrong credentials"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { userPassword: hashedPassword, ...others } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000); // 1 hour
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json({ message: "Logged in successfully", ...others });
  } catch (error) {
    next(error);
  }
};

const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ userEmail: req.body.userEmail });
    console.log(user);
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { userPassword: hashedPassword, ...others } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json({ message: "Logged in successfully", ...others });
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await bcryptjs.hash(generatePassword, 10);
      const newUser = new User({
        userName:  req.body.name.split(' ').join('').toLowerCase() +
        Math.random().toString(36).slice(-8),
        userEmail: req.body.email,
        userPassword: hashedPassword,
        userProfilePic: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { userPassword: hashedPassword2, ...others } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json({ message: "Logged in successfully", ...others });
    }
  } catch (error) {
    next(error);
  }
};

const logout = (req, res) => {
  res
    .clearCookie("access_token", { sameSite: "none", secure: true })
    .status(200)
    .json({ message: "Logged out successfully" });
};

export { signUp, signIn, google };
