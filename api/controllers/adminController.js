import Admin from "../models/adminModel.js";
import bcryptjs from "bcryptjs";
import errorHandler from "../utils/error.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const adminLogin = async (req, res, next) => {
  const { userName, userPassword } = req.body;
  try {
    const admin = await Admin.findOne({ userName });
    if (!admin) return next(errorHandler(404, "User not found"));

    const ok = await bcryptjs.compare(userPassword, admin.userPassword);
    if (!ok) return next(errorHandler(401, "Wrong credentials"));

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
    const { userPassword: _pwd, ...others } = admin._doc;
    const expiryDate = new Date(Date.now() + 3600000);

    res
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        expires: expiryDate,
      })
      .status(200)
      .json({ message: "Logged in successfully", ...others });
  } catch (error) {
    next(error);
  }
};

const adminHome = async (req, res, next) => {
  try {
    const usrs = await User.find().sort({ _id: -1 });
    res.status(200).json(usrs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const adminLogout = async (req, res, next) => {
  res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Logged out successfully" });
};

const addUser = async (req, res, next) => {
  const { userName, userEmail, userPassword } = req.body;
  try {
    const user = await User.findOne({ userName });
    const emailExist = await User.findOne({ userEmail });

    if (user) return next(errorHandler(401, "User already exists"));
    if (emailExist) return next(errorHandler(401, "Email already exists"));
    if (userPassword.length < 6)
      return next(errorHandler(401, "Password must be at least 6 characters"));

    const hashedPassword = await bcryptjs.hash(userPassword, 10);

    const newUser = new User({
      userName,
      userEmail,
      userPassword: hashedPassword,
    });
    console.log(newUser);

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const editUserData = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const userEdit = async (req, res) => {
  try {
    const id = req.params.id;
    const { userName, userEmail } = req.body;
    const editedUser = await User.findByIdAndUpdate(id, {
      $set: { userName: userName, userEmail: userEmail },
    }, { new: true });
    console.log(`Edited user: ${editedUser}`);
    res.status(200).json(editedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await User.findByIdAndDelete(id);
    console.log(`Deleted user: ${deletedUser}`);
    res.status(200).json(deletedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Exporting all functions at once
export {
  adminLogin,
  adminHome,
  adminLogout,
  addUser,
  editUserData,
  userEdit,
  deleteUser,
};
