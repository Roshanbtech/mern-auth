// import express from "express";
import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";


const signUp = async (req, res) => {
  try {
    const { userName, userEmail, userPassword } = req.body;
    const hashedPassword = await bcryptjs.hash(userPassword, 10);
    const newUser = new User({ userName, userEmail, userPassword:hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { signUp };
